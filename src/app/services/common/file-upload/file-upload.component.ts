import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { AlerttifyService, MessageType, Position } from '../../admin/alerttify.service';
import { CustomToastrService, ToastrMessageType} from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertifyService: AlerttifyService,
    private customToastrService: CustomToastrService,
    private dialog: MatDialog,
    private dialogService: DialogService) { }

  public files: NgxFileDropEntry[];

  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed: () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" })
        }, fileData).subscribe(data => {
      const message: string = "Dosyalar başarıyla yüklenmiştir.";
         
      if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              })
          } 

    }, (errorResponse: HttpErrorResponse) => {
      const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";
          if (this.options.isAdminPage) {
            this.alertifyService.message(message,
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              })
          } 
        });
      }
    });
  }

  //openDialog(afterClosed: any): void {
  //  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //    width: '250px',
  //    data: FileUploadDialogState.Yes,
  //  });

  //  dialogRef.afterClosed().subscribe(result => {
  //    if (result == FileUploadDialogState.Yes)
  //      afterClosed();
  //  });
  //}

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}