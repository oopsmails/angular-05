
Sandbox:
ng g m sandbox
ng g c sandbox\components\parent
ng g s shared\services\data-provider
ng g c sandbox\components\live-data
ng g c sandbox\components\view-child\joke-list

parent: parent

live-data: ChangeDetectorRef
https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f

joke-list: @ViewChild, https://codecraft.tv/courses/angular/components/viewchildren-and-contentchildren/
http://www.thetechieshouse.com/use-angular-4-viewchild-5-minutes/



====================================================
ng new integration
cd integration

ng g m core
ng g m shared

ng g c core\components\navbar-bs

npm install --save bootstrap@next

npm i --save @ng-bootstrap/ng-bootstrap

npm i --save @angular/cdk @angular/material @angular/animations hammerjs

----
add icon to navigation bar. Since bootstrap dropped glyphicon, so, we need install 
font-awesome.
49:11: 
1. npm i font-awesome --save
2. import it in our global style sheet, style.css
@import "~font-awesome/css/font-awesome.css";
3. bs-navbar.component.html
<i class="fa fa-leaf" aria-hidden="true"></i>

----

navbar-bs:

-- routerLink not working: 
need to add RouterModule.forChild([]) in core.module.ts, because using routerLink="...".

-- dropdown not working: 
need to add NgbModule.forRoot().ngModule in shared.module.ts and then add SharedModule
in core.module.ts, because 
<div ngbDropdownMenu ...


=======================================================

====> CrossOrigin: problem
Failed to load http://localhost:8080/backendmock/downloadFile/docx?filename=testDocx.docx: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:4200' is therefore not allowed access. The response had HTTP status code 403.

==> To make localhost:4200 connect to localhost:8080

--> option 1: Server side: Spring boot,

Solution 1:
Application configuration level, SpringBootBackendMockApplication, 
@Bean
public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurerAdapter() {
        @Override
        public void addCorsMappings(CorsRegistry registry) {
            registry
                    .addMapping("/backendmock/**")
                    .allowedOrigins("http://localhost:4200")
                    .allowedMethods("*");
        }
    };
}

Solution 2:
@RestController
@RequestMapping("/backendmock")
@CrossOrigin <-------------------------- add this
public class StreamingResponseBodyController

Solution 3:

response.setHeader("Access-Control-Allow-Origin", "*"); //ok, without WebMvcConfigurer in SpringBootBackendMockApplication

--> option 2: Client side: Angular,
a. Add proxy.conf.json in the same folder which package.json resides.
b. package.json, script,
"start": "ng serve --proxy-config proxy.conf.json",
c. Define URL ...
 private txtUrl = '/backendmock/downloadFile/txt?filename=testTxt.txt'; // with proxy.conf.json
 vs.
 private pdfUrl = 'http://localhost:8080/backendmock/downloadFile/pdf?filename=testPdf.pdf'; // send directly to server
d. use "npm start" to start server instead of "ng serve"

seeing following in log ...

[HPM] POST /backendmock/downloadFile/xlsx?filename=testXlsx.xlsx -> http://localhost:8080
[HPM] POST /backendmock/downloadFile/txt?filename=testTxt.txt -> http://localhost:8080

=======================================================






=======================================================

ctrl + alt + o: organize import


