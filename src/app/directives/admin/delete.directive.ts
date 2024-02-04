import { EventEmitter } from '@angular/core';
import { Directive, ElementRef, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from '../../base/base.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { DialogService } from '../../services/common/dialog.service';
import { AlerttifyService, MessageType, Position } from '../../services/admin/alerttify.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductService } from '../../services/common/models/product.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService: AlerttifyService,
    private dialogService: DialogService,   
    private httpClientService: HttpClientService,
    private productService: ProductService
  ) {
    const img = _renderer.createElement("img");
    img.setAttribute("src", "../../../../../assets/delete.png");
    img.setAttribute("style", "cursor: pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick() {
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallScaleMultiple);
      const td: HTMLTableCellElement = this.element.nativeElement;
      await this.productService.delete(this.id);
      $(td.parentElement).animate({
        opacity: 0,
        left: "+=50",
        height: "toogle"
      }, 700, () => {
        this.callback.emit();
      });
    });
  }

  openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == DeleteState.Yes)
        afterClosed();
    });
  }

}

 
  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //    width: '250px',
  //    data: DeleteState.Yes,
  //  });

    
  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == DeleteState.Yes)
  //      afterClosed();
  //  });
  //}

