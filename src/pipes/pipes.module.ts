import { NgModule } from '@angular/core';
import { OrderByPipe } from './orderBy.pipe';

@NgModule({
  declarations: [OrderByPipe],
  exports: [OrderByPipe],
})
export class PipesModule {}
