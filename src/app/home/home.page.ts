import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { AppServiceService } from '../Services/app-service.service'
import { formatDate } from '@angular/common'
import { Log } from '../models/Log'
import { Resp } from '../models/Response'
import swal from'sweetalert2'
import { swalProviderToken } from '@sweetalert2/ngx-sweetalert2/lib/di'
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public folder: string
  _response: Resp
  data: any = {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private serv: AppServiceService,
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id')
  }
  enviarStatus(status: boolean) {
    let obj = new Log()
    if (status) obj.Status = 1
    else obj.Status = 0

    console.log(obj)
    console.log(status)

    this.serv.enviarSenal(obj).subscribe(data => {
      this._response = data
      console.log(this._response)
      if (this._response.Response) {
        swal.fire('Registrado',this._response.Message, 'success')
        //alert(this._response.Message)
      }else{
        swal.fire("Ocurrio algún error",this._response.Message,'error')
      }
    })
  }
}
