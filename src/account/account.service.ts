import { Injectable, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
import { title } from 'process';

import { AccountDto } from '../dto';
import { Account } from './account.model';


@Injectable()
export class AccountService {
    accounts: Account[] = [];

    async signup(dto: AccountDto) {
        const accountId = Math.random().toString();
        const hash = await argon.hash(dto.password);
        const newAccount = new Account(accountId, dto.name, dto.email, hash);
        this.accounts.push(newAccount);       
        //insert data into db
        
        return accountId;
    }

    getAccounts() {
        return [...this.accounts];
    }

    getAccount(accountId: string) {
        const account = this.findAccount(accountId)[0];
        return {...account};
    }

    updateAccount(accId: string, accName: string, accPassword: string, accEmail: string){
        const [account, index] = this.findAccount(accId);
        const updatedAccount = {...account}
        if(accName){
            updatedAccount.name = accName;
        }
        if(accEmail){
            updatedAccount.email = accEmail;
        }
        if(accPassword){
            updatedAccount.password = accPassword;
        }
        this.accounts[index] = updatedAccount;
    }

    removeAccount(id: string){
        const index = this.findAccount(id)[1];
        this.accounts.splice(index, 1);
    }

    private findAccount(id: string): [Account, number] {
        const accountIndex = this.accounts.findIndex((acc) => acc.id === id);
        const account = this.accounts[accountIndex];
        if(!account){
           throw new NotFoundException('Account Not found');
        }
        return [account, accountIndex];
    }
}