import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import {
  CreateProfileRequestDto,
  UpdateProfileRequestDto
} from "src/adapters/request/profile.request.dto";
import { AddProfileUseCase } from "src/usecases/profile/add-profile-usecase";
import { FindByIdProfilesUseCase } from "src/usecases/profile/find-by-id-profile-usecase";
import { FindByPropertyAndValueProfilesUseCase } from "src/usecases/profile/find-by-property-and-value-profile-usecase";
import { SecurityUtil } from "src/utils/util.security";
import { FindPaginatedProfilesUseCase } from "src/usecases/profile/find-paginated-profile-usecase";
import { UpdateProfileUseCase } from "src/usecases/profile/update-profile-usecase";
import {
  ProfileResponseDto,
} from "src/adapters/response/profile.response.dto";
import { Profile } from "src/domain/profile/profile";

@Injectable()
export class ProfileService {
  constructor(
    private readonly addProfileUseCase: AddProfileUseCase,
    private readonly updateProfileUseCase: UpdateProfileUseCase,
    private readonly findByIdProfilesUseCase: FindByIdProfilesUseCase,
    private readonly findPaginatedProfilesUseCase: FindPaginatedProfilesUseCase,
    private readonly findByPropertyAndValueProfilesUseCase: FindByPropertyAndValueProfilesUseCase,
  ) {}

  async create(data: CreateProfileRequestDto): Promise<ProfileResponseDto> {
    const existingProfiles = await this.findByPropertyAndValue(
      "userId",
      data.userId
    );

    if (existingProfiles && existingProfiles.length > 0) {
      throw new ConflictException("Profile with this userId already exists");
    }


    const profile = Profile.create(data);
    return await this.addProfileUseCase.create(profile);
  }

  async update(data: UpdateProfileRequestDto): Promise<ProfileResponseDto> {
    const existingProfile = await this.findById(data.id);

    if (!existingProfile) {
      throw new NotFoundException("Profile does not exist");
    }

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        if (data[key] === null) {
          delete data[key];
        }
      }
    }

    const profile = Profile.create(data, existingProfile.id);
    return await this.updateProfileUseCase.update(profile);
  }


  async findById(id: string): Promise<ProfileResponseDto> {
    const profile = await this.findByIdProfilesUseCase.findById(id);
    if (!profile) {
      throw new NotFoundException("Profile not found");
    }
    return profile;
  }

  async findPaginated(page: number, limit: number): Promise<ProfileResponseDto[]> {
    return await this.findPaginatedProfilesUseCase.findPaginated(page, limit);
  }

  async findByPropertyAndValue<T>(
    property: string,
    value: T
  ): Promise<ProfileResponseDto[]> {
    return await this.findByPropertyAndValueProfilesUseCase.findByPropertyAndValue(
      property,
      value
    );
  }
}
