"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[229],{7229:function(e,t,n){n.r(t),n.d(t,{default:function(){return g}});var r=n(9077),o=n(4165),s=n(5861),i=n(9439),a=n(2791),u=n(197),c=n(9434),l=n(8210),h=n(3615),d=n(2357),p=n(184),f=(0,a.lazy)((function(){return Promise.all([n.e(581),n.e(319)]).then(n.bind(n,6319))})),m=(0,a.lazy)((function(){return Promise.all([n.e(134),n.e(868)]).then(n.bind(n,868))})),b=(0,a.lazy)((function(){return n.e(584).then(n.bind(n,1584))})),v=(0,a.lazy)((function(){return n.e(934).then(n.bind(n,9934))}));function y(){var e=[{component:(0,p.jsx)(f,{})},{component:(0,p.jsx)(m,{})},{component:(0,p.jsx)(v,{})},{component:(0,p.jsx)(b,{})}],t=(0,c.v9)((function(e){return e.userSchedules})),n=t.registerUserSchedule,r=t.frontUserSingleSchedule,y=t.defaultSchedule,g=(0,c.v9)((function(e){return e.users})),w=g.scheduleUser,x=(g.users,(0,c.v9)((function(e){return e.branches})).branches),j=(0,a.useState)(1),C=(0,i.Z)(j,2),S=C[0],_=C[1],k=(0,c.I0)();(0,a.useEffect)((function(){w.hasOwnProperty("_id")&&function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:2,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"registerUserSchedule",o=(0,h.G)([r]);n&&e&&t&&Object.keys(o[r][n]).map((function(s){s==e&&(o[r][n][e]=t)}));(0,h.fW)(r,o[r])}("user_id",w._id)}),[w]);var P=function(){var e=(0,s.Z)((0,o.Z)().mark((function e(t,n,r){var s;return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),document.getElementById("tems_and_conditions").checked){e.next=3;break}return e.abrupt("return",alert("Please check the terms of services and refund policy."));case 3:s=(0,h.G)(["registerUserSchedule"]),s=(0,h.rw)(s.registerUserSchedule),x.map((function(e){s.branch_id===e._id&&(s.branch_name=e.name)})),s.hasOwnProperty("branch_name")||(s.branch_name="online"),w&&w.hasOwnProperty("name")&&(s.doctor_name=w.name),k((0,l.Z6)({endpoint:"/api/userschedules",config:{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(s)}})),r();case 10:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),N=function(){var e="top-[88%]";return 4===S?(e="top-[35%]",window.innerWidth>575&&(e="top-[50%]")):3===S?(e="top-[50%]",window.innerWidth>575&&(e="top-[88%]")):2===S&&(e="top-[50%]"),e};return(0,p.jsx)(a.Suspense,{fallback:(0,p.jsx)("h1",{children:"Loading"}),children:(0,p.jsx)(u.lr,{showStatus:!0,showThumbs:!1,autoPlay:!1,infiniteLoop:!1,emulateTouch:!1,autoFocus:!0,showIndicators:!1,renderArrowPrev:function(e,t){return(0,p.jsx)("button",{type:"button",className:["absolute top-[88%] left-[10%] sm:left-[44%] px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor",N()].join(" "),onClick:e,children:"Back"})},renderArrowNext:function(e,t){var o=1;if(document.getElementsByClassName("carousel-status").length){var s=document.getElementsByClassName("carousel-status")[0].innerHTML;o=parseInt(s.split("of")[0])}return _(o),4!==o?3===o?(0,p.jsx)("button",{type:"button",className:["absolute top-[88%] left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor",N()].join(" "),onClick:function(t){return P(t,o,e)},children:"Submit"}):(0,p.jsx)("button",{type:"button",className:["absolute left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor",N()].join(" "),onClick:function(t){return function(e,t){var r=document.getElementsByClassName("carousel-status")[0].innerHTML,o=parseInt(r.split("of")[0]);_(o);var s=n[o],i=(0,h.G)(["registerUserSchedule"]);void 0===i?alert("Please fill the value of session_name, doctor_id, session_date, session_time."):i=(i=i.registerUserSchedule)[o];var a=[];if(Object.keys(s).map((function(e){i.hasOwnProperty(e)&&void 0!==i[e]&&""!==i[e]&&"0"!=i[e]||"user_id"!==e&&a.push(e)})),a.length)alert("Please fill the value of "+a.join(", "));else{var u=(0,h.G)(["registerUserSchedule"]);if(u=u.registerUserSchedule,u=(0,h.rw)(u),2===o){var c={email:u.email,name:u.name,phone:u.phone};k((0,d.nT)({endpoint:"/api/users/user_from_schedule",config:{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(c)}}))}t()}}(0,e)},children:"Next"}):(0,p.jsx)("button",{type:"button",className:["absolute left-[54%] justify-center px-4 py-2 z-50 bg-themeColor text-white hover:bg-white hover:text-themeColor hover:border-2 hover:border-themeColor",N()].join(" "),onClick:function(e){return function(e,t){e.preventDefault(),t.hasOwnProperty("_id")&&t._id?(window.open("https://shop.bkash.com/md-mehedi-hasan01715703260/paymentlink/default-payment"),(0,h.fW)("registerUserSchedule",y),k((0,l.gw)({})),k((0,l.z4)(y))):alert("Something went wrong. Please try again.")}(e,r)},children:"Proceed To Pay"})},className:"presentation-mode appointment px-5 my-8",children:e.map((function(e,t){return(0,p.jsx)("div",{children:e.component},t)}))})})}function g(){return(0,p.jsx)(r.default,{css:["/assets/front/css/tailwind.css","/assets/front/css/carousel.css","/assets/front/css/appointment.css","/assets/front/css/footer.css"],children:(0,p.jsx)(y,{})})}}}]);
//# sourceMappingURL=229.720ca038.chunk.js.map