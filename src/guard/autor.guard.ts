// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   NotFoundException,
// } from '@nestjs/common';
// import { CategoryService } from 'src/category/category.service';
// import { TransactionService } from 'src/transaction/transaction.service';
// @Injectable()
// export class AuthorGuard implements CanActivate {
//   constructor(
//     private readonly transaction: TransactionService,
//     private readonly category: CategoryService,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const request = context.switchToHttp().getRequest();
//     const { id, type } = request.params;

//     let entity;
//     switch (type) {
//       case 'transaction':
//         entity = await this.transaction.findOne(id);
//         break;
//       case 'category':
//         entity = await this.category.findOne(id);
//         break;
//       default:
//         throw new NotFoundException('Something went wrong...');
//     }

//     const user = request.user;

//     if (entity && user && entity.user.id === user.id) {
//     }
//     return true;
//   }
// }
