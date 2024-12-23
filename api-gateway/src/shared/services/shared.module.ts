import { Module } from "@nestjs/common";
import JWTService from "./jwt.service";
import { HashService } from "./hash.service";

@Module({providers:[JWTService,HashService]})
export class SharedModule{

}