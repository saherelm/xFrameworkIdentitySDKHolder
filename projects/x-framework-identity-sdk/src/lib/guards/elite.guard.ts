import { Injectable } from '@angular/core';
import { XBaseGuard } from '../base/x-base.guard';
import { XAvailableRoles } from '../typings/x-role.typings';

@Injectable({
  providedIn: 'root',
})
export class EliteGuard extends XBaseGuard {
  role = XAvailableRoles.Elite;
}
