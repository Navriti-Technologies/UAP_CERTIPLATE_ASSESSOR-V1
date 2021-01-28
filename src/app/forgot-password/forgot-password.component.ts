import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
//import { FlashMessagesService } from 'angular2-flash-messages';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  email : HTMLInputElement;
  message : any;

  constructor(private route: Router,
    //private flashMessage: FlashMessagesService,  
  ) { }

  ngOnInit(): void {
  }


  sendlink() {
    this.email = document.getElementById('email') as HTMLInputElement;
    if (this.email.value == '') {
      document.getElementById('warning').innerHTML =
        '<b> <h2>' + 'Email field required!!' + '</h2></b>';
      $('#forgotpassword').css('display', 'block');
      $('#forgot-password').css('display', 'none');
    }
      else if (this.email.value) {
        localStorage.setItem('emailid', this.email.value);
        this.send_link_verification();        
        }
  }

  send_link_verification(){
    $.ajax({
      url: environment.URL_send_mail,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey : environment.ApiKey,
        Email : this.email.value,
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        localStorage.setItem(json.SendForgotPasswordMailData.Message, JSON.stringify(data));
        if (json.SendForgotPasswordMailData.Message == 'Mail has been sent to your registered email with reset information!')
        {
            this.route.navigate(['email_sent_successfully']);
        }else {
          document.getElementById('warning').innerHTML =
          '<b><h2>' +
          json.SendForgotPasswordMailData.Message +
          '</h2></b>';
        $('#login').css('display', 'block');
        $('#log-in').css('display', 'none');}
      },
      error: function (err) {
        console.log('error:' + err);
        $('#login').css('display', 'block');
        $('#log-in').css('display', 'none');
      },
    });
  }



  popup(){
  }
  
}
