import { IsInt, IsOptional, IsString } from "class-validator";

export class ProsConsDiscusser{
    
    @IsString()
    readonly prompt: string;

}