import { Body, Controller, Delete, Get, Param, Post, Patch } from '@nestjs/common';
import { Request } from 'express';
import { AccountService } from './account.service';
import { AccountDto } from '../dto'

@Controller('account')
export class AccountController {
    constructor(private accountService: AccountService) {}

    @Post('signup')
    async sigup(@Body() dto: AccountDto) {
        const accountId = await this.accountService.signup(dto)
        return {message: 'Im signed up', id: accountId};
    }

    @Get()
    getAccounts(){
        return this.accountService.getAccounts()
    }

    @Get(':id')
    getAccount(@Param('id') accountId: string) {
        const account = this.accountService.getAccount(accountId)
        return {...account}
    }
    @Patch(':id')
    updateAccount(
        @Param('id') accountId: string, 
        @Body('name') name: string, 
        @Body('password') password: string,
        @Body('email') email: string) {
            this.accountService.updateAccount(accountId, name, password, email)
            return `Account ${accountId} updated`;
    }

    @Delete(':id')
    removeAccount(@Param('id') accountId: string) {
        this.accountService.removeAccount(accountId);
        return `Account ${accountId} deleted`;
    }
}
