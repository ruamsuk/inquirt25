# Inquiry25

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.0.4.

##### ส่วนประกอบของโปรเจค
1. Angular v.16.0.4
2. Angular material v.16.0.3
3. Angular/fire v.7.6.1
4. @ngneat/hot-toast v.5.0.1
5. @ngneat/until-destroy v.10.0.0-beta.0
6. moment.js v.2.29.4
7. tailwind.css
8. ngx-captcha v.13.0.0 - reCaptcha V.3

----
##### การแก้ไขปัญหาบางอย่าง
* moment.js ต้องไปเซทไฟล์ Angular.json เพื่อไม่ให้ขึ้นเตือนตัวเหลืองๆ ในขณะคอมไนล์
````typescript
...
"allowedCommonJsDependencies": [
              "moment"
            ],
...
````
* กรณีใช้ angular fire และ material dialog
````typescript
providers: [
    {
      provide: FIREBASE_OPTIONS, useValue: environment.firebase,
    },
    {
      provide: MatDialogRef, useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA, useValue: {}
    }
  ],
````
* tailwind.css
เพื่อไม่ให้มันไปรบกวนกับ material ให้เซทไฟล์ tailwind.config.js ดังนี้
````typescript
plugins: [],
  corePlugins: {
    preflight: false,
  },
  ````
* tooltip style ใส่ไว้ในไฟล์ scss or css ของ component ที่ต้องการเปลี่ยนสไตล์
````css
 mat-tooltip-component .mdc-tooltip__surface {
  background-color: #dd00ff !important;
  font-size: 16px !important;
}
````

* environments

_ต้องสร้างก่อนจะติดตั้ง angular/fire เพื่อให้สามารถยกเว้นไม่ต้องอัพโหลดไป git ในไฟล์ .gitignore ตัว webstorm จะมีให้แอดไฟล์ที่ยกเว้นได้ ทำตามนั้น_

---
โปรเจคนี้ทำขึ้นตามความเข้าใจของเราเอง เรียนรู้และแก้ปัญหาโดยยูทูปและเวปไซค์ เมื่อสามารถทำงานได้ตามวัตถุประสงค์ ก็โอเคแล้ว

---

##### แก้ไขกรณี Page not found
1. copy fire src/index.html than pasting in dist/inquiry25
2. delete .filebase folder
3. delete .firebaserc
4. run ng build
5. run firebase init
6. choose Hosting
7. configure single-page -> yes
8. overwrite index.html -> no
9. run firebase deploy
10. finish!

##### <span style="color:red">แก้ไข Git repository</span>

- git remote -v
- git remote set-url origin <span style="color:orange">'repository name'</span>
- if push reject use git push -f origin master
