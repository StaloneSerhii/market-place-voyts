"use strict";(self.webpackChunkmarket_place_voyts=self.webpackChunkmarket_place_voyts||[]).push([[213],{4213:function(e,l,r){r.r(l);var n=r(9439),i=r(9434),t=r(5705),s=r(2791),a=r(7689),o=r(1087),d=r(8007),c=r(9940),u=r(2561),p=r(6055),x=r(1347),h=r(6307),m=r(7425),g=r(7472),y=r(184),f=d.Ry().shape({name:d.Z_().min(2,"Too Short name!").max(35,"Too Long name!").required("Name is required"),fename:d.Z_().min(2,"Too Short name!").max(35,"Too Long name!").required("Name is required"),email:d.Z_().email("Invalid email").required("Email is required"),phone:d.Z_().min(14,"Too Short name!").max(14,"Too Long name!").notRequired(),city:d.Z_().required().min(3,"Too Short name!"),viddill:d.Z_().required(),oplata:d.Z_().required()});l.default=function(){var e=(0,i.I0)(),l=(0,a.s0)(),r=(0,s.useState)(),d=(0,n.Z)(r,2),j=d[0],v=d[1],b=(0,s.useState)(0),_=(0,n.Z)(b,2),C=_[0],B=_[1],k=(0,i.v9)(x.v0),L=(0,i.v9)(c.Py),S=(0,i.v9)(c.pC),q=(0,i.v9)(c.qA);(0,s.useEffect)((function(){if(j){var e=j.reduce((function(e,l){return e+l.price*l.count}),0);B(e)}}),[j]);(0,s.useEffect)((function(){return S.length>0?v(S):k.isLoggedIn?void v([]):v(q)}),[S,q,k.isLoggedIn]);var N={name:k.isLoggedIn?k.user.name:"",fename:k.isLoggedIn?k.user.fename:"",email:k.isLoggedIn?k.user.email:"",phone:k.isLoggedIn?k.user.phone:"",comments:"-",city:k.isLoggedIn?k.user.city:"",viddill:"",oplata:""},I=(0,t.TA)({initialValues:N,validationSchema:f,onSubmit:function(r){window.confirm("\u0412\u0438 \u043f\u0456\u0434\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0443\u0454\u0442\u0435 \u0441\u0432\u043e\u044e \u043f\u043e\u043a\u0443\u043f\u043a\u0443?")&&k.isLoggedIn?(e((0,u.bJ)({values:r,select:S})),l("/profile/settings"),e((0,p.zg)())):(0,g.Wk)({values:r,select:q}).then((function(r){201===r.status&&(l("/"),e((0,p.zg)()))}))}}),w=function(e){var l=e.target,r=l.name,n=l.value;I.setFieldValue(r,n)};return(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{className:"block__name",children:[(0,y.jsx)(o.rU,{to:"/busket",style:{fontSize:"35px",marginLeft:"25px",textAlign:"center",fontWeight:900,margin:"15px"},children:"| \u041a\u043e\u0448\u0438\u043a |"}),(0,y.jsx)(o.rU,{to:k.isLoggedIn?"/profile/store":"/myorder",style:{fontSize:"35px",marginLeft:"25px",textAlign:"center",fontWeight:900,margin:"15px"},children:"| \u041c\u043e\u0457 \u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f |"})]}),void 0!==j&&j&&j.length>0?(0,y.jsxs)("form",{onSubmit:I.handleSubmit,style:{display:"flex",justifyContent:"center",flexWrap:"wrap"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("label",{className:"zak",children:(0,y.jsxs)("div",{className:"formData",children:[(0,y.jsx)("h3",{children:"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u0456 \u0434\u0430\u043d\u0456"}),(0,y.jsxs)("div",{className:"formData--label",children:[(0,y.jsx)("input",{required:!0,type:"text",name:"name",placeholder:"\u0406\u043c\u044f",onBlur:I.handleBlur,value:I.values.name,onChange:w,style:I.touched.name&&I.errors.name?{border:"1px solid red"}:{border:"1px solid gray"}}),(0,y.jsx)("input",{required:!0,type:"text",name:"fename",placeholder:"\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435",onBlur:I.handleBlur,value:I.values.fename,onChange:w,style:I.touched.fename&&I.errors.fename?{border:"1px solid red"}:{border:"1px solid gray"}}),(0,y.jsx)("input",{required:!0,type:"tel",name:"phone",placeholder:"38-000-000-00-00",onBlur:I.handleBlur,value:I.values.phone,onChange:function(e){var l=e.target.value;(l=l.replace(/\D/g,"")).length>3&&l.length<=6?l=l.slice(0,3)+" "+l.slice(3):l.length>6&&(l=l.slice(0,2)+"("+l.slice(2,5)+")"+l.slice(5)),I.setFieldValue("phone",l)},style:I.touched.phone&&I.errors.phone?{border:"1px solid red"}:{border:"1px solid gray"}}),(0,y.jsx)("input",{type:"email",name:"email",placeholder:"Email",onBlur:I.handleBlur,value:I.values.email,onChange:w,style:I.touched.email&&I.errors.email?{border:"1px solid red"}:{border:"1px solid gray"}})]}),(0,y.jsx)("textarea",{type:"text",name:"comments",placeholder:"\u041a\u043e\u043c\u0435\u043d\u0442\u0430\u0440\u0456 \u0434\u043e \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f",onBlur:I.handleBlur,value:I.values.comments,onChange:w,style:{width:"750px",height:"80px",borderRadius:"5px",fontSize:"15px",justifyContent:"center"}})]})}),(0,y.jsxs)("label",{className:"formData--post",children:['\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430 "\u041d\u043e\u0432\u0430 \u041f\u043e\u0448\u0442\u0430" \u0443 \u0432\u0456\u0434\u0456\u043b\u0435\u043d\u043d\u044f',(0,y.jsx)("input",{required:!0,type:"text",placeholder:"\u041c\u0456\u0441\u0442\u043e/\u041d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u0439 \u043f\u0443\u043d\u043a\u0442",name:"city",onBlur:I.handleBlur,onChange:w,style:I.touched.city&&I.errors.city?{border:"1px solid red"}:{border:"1px solid gray"}}),(0,y.jsx)("input",{required:!0,type:"text",placeholder:"\u0412\u0456\u0434\u0456\u043b\u0435\u043d\u043d\u044f \u043d\u043e\u0432\u043e\u0457 \u043f\u043e\u0448\u0442\u0438",name:"viddill",onBlur:I.handleBlur,onChange:w,style:I.touched.viddill&&I.errors.viddill?{border:"1px solid red"}:{border:"1px solid gray"}})]}),(0,y.jsxs)("div",{className:"formData--post pay",children:[(0,y.jsxs)("label",{required:!0,children:[(0,y.jsx)("p",{children:" \u0421\u043f\u043e\u0441\u043e\u0431\u0438 \u043e\u043f\u043b\u0430\u0442\u0438"}),(0,y.jsx)("input",{type:"radio",name:"oplata",onBlur:I.handleBlur,checked:I.values.postOplata,onChange:function(e){I.setFieldValue("oplata","\u041f\u0456\u0441\u043b\u044f\u043e\u043f\u043b\u0430\u0442\u0430 \u041d\u043e\u0432\u0430 \u041f\u043e\u0448\u0442\u0430, \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438")}}),"\u041f\u0456\u0441\u043b\u044f\u043e\u043f\u043b\u0430\u0442\u0430 \u041d\u043e\u0432\u0430 \u041f\u043e\u0448\u0442\u0430, \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438 \u0431\u0443\u0434\u0435",(0,y.jsxs)("span",{children:[" ",C.toFixed(2)," \u0433\u0440\u043d"]})]}),(0,y.jsxs)("label",{children:[(0,y.jsx)("input",{type:"radio",name:"oplata",onBlur:I.handleBlur,checked:I.values.monoOplata,onChange:function(e){I.setFieldValue("oplata","\u041e\u043f\u043b\u0430\u0442\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0443 \u041c\u043e\u043d\u043e\u0411\u0430\u043d\u043a\u0443")}}),"\u041e\u043f\u043b\u0430\u0442\u0430 \u043d\u0430 \u043a\u0430\u0440\u0442\u0443 \u041c\u043e\u043d\u043e\u0411\u0430\u043d\u043a\u0443 1231234545 \u0420\u0430\u0434\u0447\u0456\u0432 \u041c\u0438\u0445\u0430\u0441\u0456\u043a \u041f\u043e\u043d\u0435 \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438",(0,y.jsxs)("span",{children:[" ",C.toFixed(2)," \u0433\u0440\u043d"]})]}),I.touched.oplata&&I.errors.oplata&&(0,y.jsx)("div",{className:"error",style:{color:"red"},children:"\u0412\u0438 \u043d\u0435 \u0432\u0438\u0431\u0440\u0430\u043b\u0438 \u0441\u043f\u043e\u0441\u0456\u0431 \u043e\u043f\u043b\u0430\u0442\u0438"})]})]}),(0,y.jsxs)("div",{className:"formData--buy",children:[(0,y.jsx)("h3",{children:"\u0412\u0430\u0448\u0456 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f"}),(0,y.jsx)("div",{className:"block__listBuy",children:(0,y.jsxs)("ul",{style:{display:"flex",flexDirection:"column",gap:"15px"},children:[L?(0,y.jsx)(h.Z1,{height:"100",width:"100",color:"#4fa94d",wrapperStyle:{justifyContent:"center"},wrapperClass:"",visible:!0,ariaLabel:"three-circles-rotating",outerCircleColor:"",innerCircleColor:"",middleCircleColor:""}):j&&j.length>0&&j.map((function(l){return(0,y.jsxs)("li",{className:"block__listBuy--item",children:[(0,y.jsx)("button",{className:"busketDell",textarea:"\u0412\u0430\u0434\u0430\u043b\u0438\u0442\u0438 \u0437 \u043a\u043e\u0448\u0438\u043a\u0430",onClick:function(){return k.isLoggedIn?e((0,u.Qk)(l._id)):e((0,p.tX)(l.id))},children:(0,y.jsx)(m.GnT,{})}),(0,y.jsxs)(o.rU,{to:k.isLoggedIn?"/product/".concat(l.id):"/product/".concat(l._id),children:["    ",(0,y.jsx)("img",{className:"block__listBuy--img",src:l.img[0],alt:"img",width:"110px"})]}),(0,y.jsxs)("div",{style:{display:"flex"},children:[(0,y.jsx)("div",{children:(0,y.jsx)("p",{className:"block__listBuy--name",children:l.name})}),(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"row",gap:"15px",marginLeft:"15px"},children:[(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,y.jsx)("span",{style:{color:"rgb(134, 134, 134)",lineHeight:"1.5"},children:"\u0426\u0456\u043d\u0430"}),(0,y.jsxs)("span",{style:{fontSize:"20px"},children:[l.price," \u0433\u0440\u043d/\u0448\u0442"]})]}),(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column",lineHeight:"1.5"},children:[(0,y.jsx)("span",{style:{color:"rgb(134, 134, 134)"},children:"\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c"}),(0,y.jsx)("label",{style:{border:"1px solid rgb(209, 209, 209)",borderRadius:"5px",textAlign:"center",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"5px"},children:(0,y.jsx)("input",{type:"number",name:"weight",min:"1",max:"200",step:"1",onChange:function(r){return n=r.target.value,i=l._id,void(k.isLoggedIn?e((0,p._O)({id:i,counter:n,auth:!0})):e((0,p._O)({id:i,counter:n,auth:!1})));var n,i},value:l.count})})]}),(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,y.jsx)("span",{style:{color:"rgb(134, 134, 134)",lineHeight:"1.5"},children:"\u0421\u0443\u043c\u0430"}),(0,y.jsxs)("span",{style:{color:"red",fontSize:"20px"},children:[l.price*l.count," \u0433\u0440\u043d"]})]})]})]})]},l._id)})),(0,y.jsxs)("p",{style:{textAlign:"end",marginRight:"10px"},children:["\u0420\u0430\u0437\u043e\u043c \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438: ",C.toFixed(2)," \u0433\u0440\u043d"]})]})}),(0,y.jsx)("button",{type:"submit",className:"modal__btn",style:{marginTop:"15px"},children:"\u041e\u0424\u041e\u0420\u041c\u0418\u0422\u0418 \u0417\u0410\u041c\u041e\u0412\u041b\u0415\u041d\u041d\u042f"})]})]}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)("p",{style:{textAlign:"center",fontSize:"40px"},children:["\u0423 \u0432\u0430\u0448\u043e\u043c\u0443 \u043a\u043e\u0448\u0438\u043a\u0443 \u043d\u0435\u043c\u0430\u0454 \u0442\u043e\u0432\u0430\u0440\u0456\u0432, \u043f\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044c \u0434\u043e \u043d\u0430\u0448\u043e\u0433\u043e \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0443 \u0449\u043e\u0431 \u0437\u0434\u0456\u0439\u0441\u043d\u0438\u0442\u0438 \u043f\u043e\u043a\u0443\u043f\u043a\u0443 ",(0,y.jsx)("br",{}),(0,y.jsx)("br",{}),(0,y.jsx)(o.rU,{style:{textAlign:"center",fontSize:"40px",color:"red"},to:"/productBY",children:"\u0422\u0418\u041a!"})]})})]})}}}]);
//# sourceMappingURL=213.66cda839.chunk.js.map