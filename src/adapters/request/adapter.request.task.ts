import { IsString, IsOptional, IsEnum, Matches } from 'class-validator';
import { StatusEnum } from 'src/domain/task/types';
import DateUtil from 'src/utils/util.date';



export class CreateRequestTaskDto {
    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsOptional() 
    @IsString()
    userId?: string;

    @IsOptional() 
    @IsString()
    @Matches(DateUtil.getFefaultFormatRegex())
    expirationDate: string;

    @IsOptional() 
    @IsString()
    @Matches(DateUtil.getFefaultFormatRegex())
    remindDate: string;

    @IsOptional() 
    @IsEnum(StatusEnum)
    status?: StatusEnum;

    @IsOptional()
    @IsString()
    assignTo?: string;
}

export class UpdateRequestTaskDto {
    @IsString()
    id: string;

    @IsOptional() 
    @IsString()
    title: string;

    @IsOptional() 
    @IsString()
    text: string;

    @IsOptional() 
    @IsString()
    userId?: string;

    @IsOptional() 
    @IsString()
    expirationDate?: string = DateUtil.futureDateByHours(24).toString(); ;

    @IsOptional() 
    @IsString()
    remindDate?: string = DateUtil.futureDateByHours(23).toString(); ;

    @IsOptional()
    @IsString()
    assignTo?: string = ''; 
}



