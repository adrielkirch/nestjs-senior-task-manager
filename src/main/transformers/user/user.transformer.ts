import { UserResponseDto } from 'src/adapters/response/user.response.dto';
import { UserModel } from 'src/infrastructure/database/mongodb/models/user/user.model';

/**
 * Utility class for transforming MongoDB user models to a simpler format.
 * This class provides static methods for converting UserModel objects to a more concise user representation.
 */
export class UserTransformer {
  /**
   * Transforms a single UserModel object to a simplified user representation.
   * @param user The UserModel object to be transformed.
   * @returns An object containing only essential user properties.
   */
  static toUser(user: UserModel): UserResponseDto {
    return {
      id: user.id,                
      name: user.name,            
      surname: user.surname,      
      email: user.email,            
      createdAt: user.createdAt,  
      updatedAt: user.updatedAt ,
      role: user.role,
      phone: user.phone
    } as UserResponseDto;
  }

  /**
   * Transforms an array of UserModel objects to an array of simplified user representations.
   * @param users An array of UserModel objects to be transformed.
   * @returns An array of objects containing essential user properties for each user.
   */
  static toUsers(users: UserModel[]) {
    // Map each UserModel object to a simplified user representation using the `toUser` method.
    return users.map(this.toUser);
  }
}
