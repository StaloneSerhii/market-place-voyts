"use strict";(self.webpackChunkmarket_place_voyts=self.webpackChunkmarket_place_voyts||[]).push([[213],{4213:function(e,i,l){l.r(i);var r=l(1413),n=l(9439),d=l(9434),t=l(5705),s=l(2791),o=l(7689),a=l(1087),p=l(8007),c=l(9940),x=l(2561),u=l(6055),h=l(1347),m=l(6307),g=l(7425),v=l(7472),b=l(2382),C=l(846),f=l(1686),j=l.n(f),y=l(184),L=p.Ry().shape({name:p.Z_().min(2,"Too Short name!").max(35,"Too Long name!").required("Name is required"),fename:p.Z_().min(2,"Too Short name!").max(35,"Too Long name!").required("Name is required"),email:p.Z_().email("Invalid email").required("Email is required"),phone:p.Z_().min(14,"Too Short name!").max(14,"Too Long name!").notRequired(),city:p.Z_().required(),viddill:p.Z_().required(),post:p.Z_().required(),oplata:p.Z_().required()});i.default=function(){var e=(0,d.I0)(),i=(0,o.s0)(),l=(0,s.useState)(),p=(0,n.Z)(l,2),f=p[0],_=p[1],w=(0,s.useState)(0),B=(0,n.Z)(w,2),I=B[0],q=B[1],Z=(0,d.v9)(h.v0),k=(0,d.v9)(c.Py),F=(0,d.v9)(c.pC),N=(0,d.v9)(c.qA);(0,s.useEffect)((function(){if(f){var e=f.reduce((function(e,i){return e+i.price*i.count}),0);q(e)}}),[f]);(0,s.useEffect)((function(){return F.length>0?_(F):Z.isLoggedIn?void _([]):_(N)}),[F,N,Z.isLoggedIn]);var D={name:Z.isLoggedIn?Z.user.name:"",fename:Z.isLoggedIn?Z.user.fename:"",email:Z.isLoggedIn?Z.user.email:"",phone:Z.isLoggedIn?Z.user.phone:"",comments:"\u0414\u043e\u0431\u0440\u0433\u043e \u0434\u043d\u044f. \u042f \u0431 \u0445\u043e\u0442\u0456\u0432...",city:Z.isLoggedIn?Z.user.city:"",viddill:"",oplata:"",post:""},S=(0,t.TA)({initialValues:D,validationSchema:L,onSubmit:function(l){var r=window.confirm("\u0412\u0438 \u043f\u0456\u0434\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0443\u0454\u0442\u0435 \u0441\u0432\u043e\u044e \u043f\u043e\u043a\u0443\u043f\u043a\u0443?");r&&Z.isLoggedIn?(e((0,x.bJ)({values:l,select:F})),i("/profile/store"),e((0,u.zg)())):r&&(0,v.Wk)({values:l,select:N}).then((function(l){201===l.status&&(j().Report.success("\u0412\u0430\u0448 \u0442\u043e\u0432\u0430\u0440 \u0443\u0441\u043f\u0456\u0448\u043d\u043e \u043f\u0440\u0438\u0434\u0431\u0430\u043d\u0438\u0439!","\u041e\u0447\u0456\u043a\u0443\u0439\u0442\u0435 \u043d\u0430 \u0434\u0437\u0432\u0456\u043d\u043e\u043a \u0432\u0456\u0434 \u043d\u0430\u0448\u043e\u0433\u043e \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u0430 \u0434\u043b\u044f \u043f\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043d\u043d\u044f \u0432\u0456\u0434\u043f\u0440\u0430\u0432\u043a\u0438!"),i("/"),e((0,u.zg)()))}))}}),A=function(e){var i=e.target,l=i.name,r=i.value;S.setFieldValue(l,r)};return(0,y.jsxs)("div",{style:{maxWidth:"1280px",marginLeft:"auto",marginRight:"auto"},children:[(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"5px",margin:"24px auto",padding:" 12px 0"},children:[(0,y.jsx)("svg",{width:"20",height:"21",viewBox:"0 0 20 21",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M18.0992 9.91073L16.4305 8.24404L10.59 2.41065C10.4335 2.25442 10.2213 2.16666 10.0001 2.16666C9.77884 2.16666 9.56666 2.25442 9.41019 2.41065L3.56968 8.24404L1.90096 9.91073C1.74898 10.0679 1.66488 10.2784 1.66678 10.4969C1.66868 10.7154 1.75643 10.9244 1.91113 11.0789C2.06582 11.2334 2.27509 11.3211 2.49386 11.323C2.71262 11.3249 2.92338 11.2409 3.08075 11.0891L3.32521 10.8449V17.1666C3.32521 17.6087 3.50102 18.0326 3.81397 18.3452C4.12691 18.6577 4.55136 18.8333 4.99393 18.8333H7.49701C7.71829 18.8333 7.93051 18.7455 8.08699 18.5892C8.24346 18.433 8.33137 18.221 8.33137 18V14.6666C8.33137 14.4456 8.41927 14.2336 8.57574 14.0774C8.73222 13.9211 8.94444 13.8333 9.16572 13.8333H10.8344C11.0557 13.8333 11.2679 13.9211 11.4244 14.0774C11.5809 14.2336 11.6688 14.4456 11.6688 14.6666V18C11.6688 18.221 11.7567 18.433 11.9132 18.5892C12.0697 18.7455 12.2819 18.8333 12.5032 18.8333H15.0062C15.4488 18.8333 15.8732 18.6577 16.1862 18.3452C16.4991 18.0326 16.675 17.6087 16.675 17.1666V10.8449L16.9194 11.0891C17.0768 11.2409 17.2875 11.3249 17.5063 11.323C17.7251 11.3211 17.9343 11.2334 18.089 11.0789C18.2437 10.9244 18.3315 10.7154 18.3334 10.4969C18.3353 10.2784 18.2512 10.0679 18.0992 9.91073Z",fill:"#111928"})}),(0,y.jsxs)("p",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[(0,y.jsx)(a.rU,{to:"/",children:" \u0413\u043e\u043b\u043e\u0432\u043d\u0430"}),(0,y.jsx)("svg",{width:"20",height:"21",viewBox:"0 0 20 21",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M7.78901 16.3333C7.56973 16.3333 7.35538 16.2649 7.17307 16.1369C6.99076 16.0088 6.84867 15.8269 6.76476 15.614C6.68085 15.4011 6.65889 15.1668 6.70166 14.9408C6.74443 14.7148 6.85 14.5072 7.00503 14.3443L10.6566 10.5071L7.00503 6.67003C6.89912 6.56254 6.81465 6.43396 6.75653 6.2918C6.69842 6.14964 6.66783 5.99674 6.66655 5.84202C6.66527 5.6873 6.69332 5.53386 6.74908 5.39066C6.80483 5.24745 6.88717 5.11735 6.99129 5.00795C7.0954 4.89854 7.21921 4.81202 7.35549 4.75343C7.49177 4.69484 7.63778 4.66536 7.78502 4.6667C7.93226 4.66804 8.07776 4.70019 8.21305 4.76126C8.34834 4.82233 8.4707 4.9111 8.57299 5.02239L13.0085 9.68333C13.2164 9.90184 13.3332 10.1982 13.3332 10.5071C13.3332 10.8161 13.2164 11.1125 13.0085 11.331L8.57299 15.9919C8.36508 16.2104 8.08308 16.3333 7.78901 16.3333Z",fill:"#6B7280"})}),(0,y.jsx)(a.rU,{to:"/busket",children:" \u041a\u043e\u0440\u0437\u0438\u043d\u0430"})]})]}),void 0!==f&&f&&f.length>0?(0,y.jsxs)("form",{onSubmit:S.handleSubmit,className:"busketForm",children:[(0,y.jsxs)("div",{style:{display:"flex",gap:"32px",flexDirection:"column"},children:[(0,y.jsxs)("div",{className:"formData",children:[(0,y.jsx)("h3",{style:{textAlign:"start",fontSize:"16px",fontWeight:"500"},children:"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u0456 \u0434\u0430\u043d\u0456"}),(0,y.jsxs)("div",{className:"formData--label",children:[(0,y.jsxs)("label",{htmlFor:"name",children:["\u0406\u043c'\u044f ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,type:"text",name:"name",id:"name",placeholder:"\u0406\u043c\u044f",onBlur:S.handleBlur,value:S.values.name,onChange:A,style:void 0===S.touched.name&&void 0===S.errors.name?{border:"1px solid rgb(164, 164, 164)"}:S.touched.name&&S.errors.name?{border:"1px solid rgb(244, 0, 0)"}:{border:"1px solid #009C2C"}})]}),(0,y.jsxs)("label",{htmlFor:"fename",children:["\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,type:"text",name:"fename",id:"fename",placeholder:"\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435",onBlur:S.handleBlur,value:S.values.fename,onChange:A,style:void 0===S.touched.fename&&void 0===S.errors.fename?{border:"1px solid rgb(164, 164, 164)"}:S.touched.fename&&S.errors.fename?{border:"1px solid rgb(244, 0, 0)"}:{border:"1px solid #009C2C"}})]}),(0,y.jsxs)("label",{htmlFor:"phone",children:["\u0422\u0435\u043b\u0435\u0444\u043e\u043d ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,id:"phone",type:"tel",name:"phone",placeholder:"38-000-000-00-00",onBlur:S.handleBlur,value:S.values.phone,onChange:function(e){var i=e.target.value;(i=i.replace(/\D/g,"")).length>3&&i.length<=6?i=i.slice(0,3)+" "+i.slice(3):i.length>6&&(i=i.slice(0,2)+"("+i.slice(2,5)+")"+i.slice(5)),S.setFieldValue("phone",i)},style:void 0===S.touched.phone&&void 0===S.errors.phone?{border:"1px solid rgb(164, 164, 164)"}:S.touched.phone&&S.errors.phone?{border:"1px solid rgb(244, 0, 0)"}:{border:"1px solid #009C2C"}})]}),(0,y.jsxs)("label",{htmlFor:"email",children:["Email ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{id:"email",type:"email",name:"email",placeholder:"Email",onBlur:S.handleBlur,value:S.values.email,onChange:A,style:void 0===S.touched.email&&void 0===S.errors.email?{border:"1px solid rgb(164, 164, 164)"}:S.touched.email&&S.errors.email?{border:"1px solid rgb(244, 0, 0)"}:{border:"1px solid #009C2C"}})]})]}),(0,y.jsx)("label",{htmlFor:"text",children:(0,y.jsx)("textarea",{id:"text",type:"text",name:"comments",className:"texteria",placeholder:"\u041a\u043e\u043c\u0435\u043d\u0442\u0430\u0440\u0456 \u0434\u043e \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f",onBlur:S.handleBlur,value:S.values.comments,onChange:A})})]}),(0,y.jsxs)("label",{id:"city",style:{maxWidth:"737px"},children:["\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u043d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u0439 \u043f\u0443\u043d\u043a\u0442",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,id:"city",type:"text",name:"city",onBlur:S.handleBlur,value:S.values.city,onChange:A,className:"inputDefault",style:void 0===S.touched.city&&void 0===S.errors.city?{border:"1px solid rgb(164, 164, 164)"}:S.touched.city&&S.errors.city?{border:"1px solid rgb(244, 0, 0)"}:{border:"1px solid #009C2C "}})]}),(0,y.jsxs)("label",{htmlFor:"post",style:{maxWidth:"737px"},children:["\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u0441\u043f\u043e\u0441\u0456\u0431 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438",(0,y.jsx)(b.Z,{required:!0,size:"small",renderInput:function(e){return(0,y.jsx)(C.Z,(0,r.Z)({},e))},id:"post",options:[{label:"\u0421\u0430\u043c\u043e\u0432\u0438\u0432\u0456\u0437 \u0437 \u043c\u0456\u0441\u0446\u044f \u043f\u0440\u043e\u0434\u0430\u0436\u0443",id:1},{label:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u041d\u043e\u0432\u0430 \u041f\u043e\u0448\u0442\u0430",id:2}],name:"post",onBlur:S.handleBlur,onChange:function(e,i){S.setFieldValue("post",i.label)},sx:void 0===S.touched.post&&void 0===S.errors.post?{"& div":{padding:"0px"},"& > div>div":{border:"1px solid rgb(164, 164, 164)",padding:"3px"}}:S.touched.post&&S.errors.post?{"& div":{padding:"0px"},"& > div>div":{border:"1px solid rgb(255, 20, 20)",padding:"3px"}}:{"& div":{padding:"0px"},"& > div>div":{border:"1px solid #009C2C",padding:"3px"}}})]}),(0,y.jsxs)("label",{htmlFor:"viddill",style:{maxWidth:"737px"},children:["\u0412\u0456\u0434\u0434\u0456\u043b\u0435\u043d\u043d\u044f \u041d\u043e\u0432\u043e\u0457 \u041f\u043e\u0448\u0442\u0438",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,id:"viddill",type:"tel",name:"viddill",onBlur:S.handleBlur,value:S.values.viddill,onChange:A,className:"inputDefault",style:void 0===S.touched.viddill&&void 0===S.errors.viddill?{border:"1px solid rgb(164, 164, 164)"}:S.touched.viddill&&S.errors.viddill?{border:"1px solid rgb(244, 0, 0)"}:{border:"1px solid #009C2C "}})]}),(0,y.jsxs)("label",{htmlFor:"oplata",style:{maxWidth:"737px"},children:["\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u0441\u043f\u043e\u0441\u0456\u0431 \u043e\u043f\u043b\u0430\u0442\u0438",(0,y.jsx)(b.Z,{required:!0,size:"small",renderInput:function(e){return(0,y.jsx)(C.Z,(0,r.Z)({},e))},id:"oplata",options:[{label:"\u041f\u0440\u0435\u0434\u043e\u043f\u043b\u0430\u0442\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443 \u043f\u0440\u043e\u0434\u0430\u0432\u0446\u044f",id:1},{label:"\u041f\u0456\u0441\u043b\u044f\u043e\u043f\u043b\u0430\u0442\u0430 \u041d\u043e\u0432\u0430 \u041f\u043e\u0448\u0442\u0430, \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438",id:2}],name:"oplata",onBlur:S.handleBlur,onChange:function(e,i){S.setFieldValue("oplata",i.label)},sx:void 0===S.touched.oplata&&void 0===S.errors.oplata?{"& div":{padding:"0px"},"& > div>div":{border:"1px solid rgb(164, 164, 164)",padding:"3px"}}:S.touched.oplata&&S.errors.oplata?{"& div":{padding:"0px"},"& > div>div":{border:"1px solid rgb(255, 20, 20)",padding:"3px"}}:{"& div":{padding:"0px"},"& > div>div":{border:"1px solid #009C2C",padding:"3px"}}})]})]}),(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{className:"formData--buy",children:[(0,y.jsx)("h3",{children:"\u0412\u0430\u0448\u0456 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f:"}),(0,y.jsx)("div",{className:"block__listBuy",children:(0,y.jsx)("ul",{style:{display:"flex",flexDirection:"column",gap:"15px",padding:"16px"},children:k?(0,y.jsx)(m.Z1,{height:"100",width:"100",color:"#4fa94d",wrapperStyle:{justifyContent:"center"},wrapperClass:"",visible:!0,ariaLabel:"three-circles-rotating",outerCircleColor:"",innerCircleColor:"",middleCircleColor:""}):f&&f.length>0&&f.map((function(i){return(0,y.jsxs)("li",{className:"block__listBuy--item",children:[(0,y.jsxs)(a.rU,{to:"/product/".concat(i.id),children:[" ",(0,y.jsx)("img",{className:"block__listBuy--img",src:i.img[0],alt:"img",width:"100px"})]}),(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)(a.rU,{to:Z.isLoggedIn?"/product/".concat(i.id):"/product/".concat(i._id),children:(0,y.jsx)("p",{className:"block__listBuy--name",children:i.name})}),(0,y.jsx)("button",{type:"button",className:"busketDell",textarea:"\u0412\u0430\u0434\u0430\u043b\u0438\u0442\u0438 \u0437 \u043a\u043e\u0448\u0438\u043a\u0430",onClick:function(){return Z.isLoggedIn?e((0,x.Qk)(i._id)):e((0,u.tX)(i.id))},children:(0,y.jsx)(g.GnT,{})})]}),(0,y.jsx)("div",{style:{display:"flex"},children:(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"row",gap:"15px",marginLeft:"15px",alignItems:"flex-end"},children:[(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[(0,y.jsx)("span",{style:{lineHeight:"2"},children:"\u0426\u0456\u043d\u0430"}),(0,y.jsxs)("span",{style:{fontSize:"20px"},children:[(0,y.jsx)("span",{style:{border:"1px solid #009C2C",borderRadius:"8px",padding:"0 5px"},children:i.price*i.count})," ","\u0433\u0440\u043d"]})]}),(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column",lineHeight:"1.5"},children:[(0,y.jsx)("span",{style:{lineHeight:"2"},children:"\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c"}),(0,y.jsx)("label",{style:{border:"1px solid rgb(209, 209, 209)",borderRadius:"5px",textAlign:"center",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"5px"},children:(0,y.jsx)("input",{type:"number",name:"weight",min:"1",max:"200",step:"1",onChange:function(l){return r=l.target.value,n=i._id,void(Z.isLoggedIn?e((0,u._O)({id:n,counter:r,auth:!0})):e((0,u._O)({id:n,counter:r,auth:!1})));var r,n},value:i.count})})]})]})})]})]},i._id)}))})})]}),(0,y.jsxs)("p",{style:{textAlign:"end"},children:["\u0420\u0430\u0437\u043e\u043c \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438:",(0,y.jsx)("span",{style:{fontWeight:"600"},children:I.toFixed(2)})," \u0433\u0440\u043d"]}),(0,y.jsx)("button",{type:"submit",className:"formLogin__btn--pr bgGreen btnHover",style:{margin:"15px 0",width:"100%",color:"#fff"},children:"\u041e\u0424\u041e\u0420\u041c\u0418\u0422\u0418 \u0417\u0410\u041c\u041e\u0412\u041b\u0415\u041d\u041d\u042f"}),Z.isLoggedIn?"":(0,y.jsxs)("p",{style:{textAlign:"end",color:"red",fontWeight:500},children:["\u0414\u043b\u044f \u0432\u0456\u0434\u0441\u043b\u0456\u0434\u043a\u043e\u0432\u0443\u0432\u0430\u043d\u043d\u044f \u0432\u0456\u0434\u043f\u0440\u0430\u0432\u043a\u0438 \u0442\u043e\u0432\u0430\u0440\u0443 \u0430\u0431\u043e ",(0,y.jsx)("br",{})," \u0456\u043d\u0448\u0438\u0445 \u043c\u043e\u0436\u043b\u0438\u0432\u043e\u0441\u0442\u0435\u0439 \u0431\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u043f\u0440\u043e\u0439\u0434\u0456\u0442\u044c \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0456\u044e \u043d\u0430 \u0441\u0430\u0439\u0442\u0456!"]})]})]}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)("p",{style:{textAlign:"center",margin:"200px auto"},children:["\u0423 \u0432\u0430\u0448\u043e\u043c\u0443 \u043a\u043e\u0448\u0438\u043a\u0443 \u043d\u0435\u043c\u0430\u0454 \u0442\u043e\u0432\u0430\u0440\u0456\u0432, \u043f\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044c \u0434\u043e \u043d\u0430\u0448\u043e\u0433\u043e\xa0",(0,y.jsx)(a.rU,{style:{textAlign:"center",color:"red"},to:"/productAll/new",children:"\u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0443"}),"\xa0 \u0449\u043e\u0431 \u0437\u0434\u0456\u0439\u0441\u043d\u0438\u0442\u0438 \u043f\u043e\u043a\u0443\u043f\u043a\u0443"]})})]})}}}]);
//# sourceMappingURL=213.3fb2ebdf.chunk.js.map