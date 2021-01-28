import { Component, OnInit ,Input, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})

export class PasswordResetComponent implements OnInit {
  private subscription: Subscription ;
  id : string;
  new_password : HTMLInputElement;
  confirm_new_password: HTMLInputElement;

  constructor(private route: Router, private router: ActivatedRoute) {}
  ngOnInit(): void {
    let url1 = window.location.href.split('=');
    var encodedString = url1[url1.length-1]  
    var decodedString = atob(encodedString).split('=');
    var UserId = decodedString[decodedString.length-1];
    var user = JSON.parse(UserId)
    sessionStorage.setItem('UserId',user.UserId);
  }

  reset_password(){
    this.new_password = document.getElementById('newpassword') as HTMLInputElement;
    this.confirm_new_password = document.getElementById('confnewpassword') as HTMLInputElement;
    if (this.new_password.value == '' || this.confirm_new_password.value == '') {
      document.getElementById('warning').innerHTML =
        '<b> <h2>' + 'Both field are required!' + '</h2></b>';
    } else if(this.new_password.value != this.confirm_new_password.value){
      document.getElementById('warning').innerHTML =
        '<b> <h2>' + 'Passwords did not matched!' + '</h2></b>';
    }
    else if (this.new_password && this.confirm_new_password) {
        this.password_reset_authentication();
    }
  }

  password_reset_authentication(){
    $.ajax({
      url: environment.URL_reset_password,
      type: 'POST',
      dataType: 'json',
      data: {
        ApiKey : environment.ApiKey,
        UserId : sessionStorage.getItem("UserId"),
        Password: this.new_password.value,
      },
      success: (data) => {
        var json = JSON.parse(JSON.stringify(data));
        localStorage.setItem(json.ResetPasswordResponseData.StatusId, JSON.stringify(data));
        if (json.ResetPasswordResponseData.Message == "Your password has been reset!")
        {
            this.route.navigate(['successful']);
        }else {
          document.getElementById('warning').innerHTML =
          '<b><h2>' +
          'Password reset failed!!' +
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

}
