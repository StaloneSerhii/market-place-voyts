"use strict";(self.webpackChunkmarket_place_voyts=self.webpackChunkmarket_place_voyts||[]).push([[213],{4213:function(e,l,i){i.r(l);var n=i(1413),r=i(9439),t=i(9434),s=i(5705),a=i(2791),d=i(7689),o=i(1087),c=i(8007),x=i(9940),u=i(2561),h=i(6055),p=i(1347),m=i(6307),g=i(7425),f=i(7472),j=i(2382),C=i(1902),y=i(184),v=c.Ry().shape({name:c.Z_().min(2,"Too Short name!").max(35,"Too Long name!").required("Name is required"),fename:c.Z_().min(2,"Too Short name!").max(35,"Too Long name!").required("Name is required"),email:c.Z_().email("Invalid email").required("Email is required"),phone:c.Z_().min(14,"Too Short name!").max(14,"Too Long name!").notRequired(),city:c.Z_().required().min(3,"Too Short name!"),viddill:c.Z_().required(),oplata:c.Z_().required()}),b=[{label:"\u0422\u0435\u0440\u043d\u043e\u043f\u0456\u043b\u044c",id:1},{label:"\u041b\u044c\u0432\u0456\u0432",id:2}];l.default=function(){var e=(0,t.I0)(),l=(0,d.s0)(),i=(0,a.useState)(),c=(0,r.Z)(i,2),w=c[0],L=c[1],_=(0,a.useState)(0),Z=(0,r.Z)(_,2),B=Z[0],I=Z[1],q=(0,t.v9)(p.v0),S=(0,t.v9)(x.Py),k=(0,t.v9)(x.pC),F=(0,t.v9)(x.qA);(0,a.useEffect)((function(){if(w){var e=w.reduce((function(e,l){return e+l.price*l.count}),0);I(e)}}),[w]);(0,a.useEffect)((function(){return k.length>0?L(k):q.isLoggedIn?void L([]):L(F)}),[k,F,q.isLoggedIn]);var D={name:q.isLoggedIn?q.user.name:"",fename:q.isLoggedIn?q.user.fename:"",email:q.isLoggedIn?q.user.email:"",phone:q.isLoggedIn?q.user.phone:"",comments:"\u0414\u043e\u0431\u0440\u0433\u043e \u0434\u043d\u044f. \u042f \u0431 \u0445\u043e\u0442\u0456\u0432...",city:q.isLoggedIn?q.user.city:"",viddill:"",oplata:""},N=(0,s.TA)({initialValues:D,validationSchema:v,onSubmit:function(i){window.confirm("\u0412\u0438 \u043f\u0456\u0434\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0443\u0454\u0442\u0435 \u0441\u0432\u043e\u044e \u043f\u043e\u043a\u0443\u043f\u043a\u0443?")&&q.isLoggedIn?(e((0,u.bJ)({values:i,select:k})),l("/profile/settings"),e((0,h.zg)())):(0,f.Wk)({values:i,select:F}).then((function(i){201===i.status&&(l("/"),e((0,h.zg)()))}))}}),A=function(e){var l=e.target,i=l.name,n=l.value;N.setFieldValue(i,n)};return(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"5px",margin:"24px 80px",padding:" 12px 0"},children:[(0,y.jsx)("svg",{width:"20",height:"21",viewBox:"0 0 20 21",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M18.0992 9.91073L16.4305 8.24404L10.59 2.41065C10.4335 2.25442 10.2213 2.16666 10.0001 2.16666C9.77884 2.16666 9.56666 2.25442 9.41019 2.41065L3.56968 8.24404L1.90096 9.91073C1.74898 10.0679 1.66488 10.2784 1.66678 10.4969C1.66868 10.7154 1.75643 10.9244 1.91113 11.0789C2.06582 11.2334 2.27509 11.3211 2.49386 11.323C2.71262 11.3249 2.92338 11.2409 3.08075 11.0891L3.32521 10.8449V17.1666C3.32521 17.6087 3.50102 18.0326 3.81397 18.3452C4.12691 18.6577 4.55136 18.8333 4.99393 18.8333H7.49701C7.71829 18.8333 7.93051 18.7455 8.08699 18.5892C8.24346 18.433 8.33137 18.221 8.33137 18V14.6666C8.33137 14.4456 8.41927 14.2336 8.57574 14.0774C8.73222 13.9211 8.94444 13.8333 9.16572 13.8333H10.8344C11.0557 13.8333 11.2679 13.9211 11.4244 14.0774C11.5809 14.2336 11.6688 14.4456 11.6688 14.6666V18C11.6688 18.221 11.7567 18.433 11.9132 18.5892C12.0697 18.7455 12.2819 18.8333 12.5032 18.8333H15.0062C15.4488 18.8333 15.8732 18.6577 16.1862 18.3452C16.4991 18.0326 16.675 17.6087 16.675 17.1666V10.8449L16.9194 11.0891C17.0768 11.2409 17.2875 11.3249 17.5063 11.323C17.7251 11.3211 17.9343 11.2334 18.089 11.0789C18.2437 10.9244 18.3315 10.7154 18.3334 10.4969C18.3353 10.2784 18.2512 10.0679 18.0992 9.91073Z",fill:"#111928"})}),(0,y.jsxs)("p",{style:{display:"flex",alignItems:"center",gap:"5px"},children:[(0,y.jsx)("a",{href:"/",children:" \u0413\u043e\u043b\u043e\u0432\u043d\u0430"}),(0,y.jsx)("svg",{width:"20",height:"21",viewBox:"0 0 20 21",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,y.jsx)("path",{d:"M7.78901 16.3333C7.56973 16.3333 7.35538 16.2649 7.17307 16.1369C6.99076 16.0088 6.84867 15.8269 6.76476 15.614C6.68085 15.4011 6.65889 15.1668 6.70166 14.9408C6.74443 14.7148 6.85 14.5072 7.00503 14.3443L10.6566 10.5071L7.00503 6.67003C6.89912 6.56254 6.81465 6.43396 6.75653 6.2918C6.69842 6.14964 6.66783 5.99674 6.66655 5.84202C6.66527 5.6873 6.69332 5.53386 6.74908 5.39066C6.80483 5.24745 6.88717 5.11735 6.99129 5.00795C7.0954 4.89854 7.21921 4.81202 7.35549 4.75343C7.49177 4.69484 7.63778 4.66536 7.78502 4.6667C7.93226 4.66804 8.07776 4.70019 8.21305 4.76126C8.34834 4.82233 8.4707 4.9111 8.57299 5.02239L13.0085 9.68333C13.2164 9.90184 13.3332 10.1982 13.3332 10.5071C13.3332 10.8161 13.2164 11.1125 13.0085 11.331L8.57299 15.9919C8.36508 16.2104 8.08308 16.3333 7.78901 16.3333Z",fill:"#6B7280"})})," ",(0,y.jsx)("a",{href:"productAll/by",children:" \u0411/\u0423 \u0437\u0430\u043f\u0447\u0430\u0441\u0442\u0438\u043d\u0438"})]})]}),void 0!==w&&w&&w.length>0?(0,y.jsxs)("form",{onSubmit:N.handleSubmit,style:{display:"flex",justifyContent:"center",flexWrap:"wrap"},children:[(0,y.jsxs)("div",{children:[(0,y.jsx)("h3",{style:{textAlign:"start",fontSize:"16px",fontWeight:"500",marginBottom:"8px"},children:"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u043d\u0456 \u0434\u0430\u043d\u0456"}),(0,y.jsxs)("div",{className:"formData",children:[(0,y.jsxs)("div",{className:"formData--label",children:[(0,y.jsxs)("label",{htmlFor:"name",children:["\u0406\u043c'\u044f ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,type:"text",name:"name",id:"name",placeholder:"\u0406\u043c\u044f",onBlur:N.handleBlur,value:N.values.name,onChange:A,style:N.touched.name&&N.errors.name?{border:"1px solid red"}:{border:"1px solid #009C2C"}})]}),(0,y.jsxs)("label",{htmlFor:"fename",children:["\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,type:"text",name:"fename",id:"fename",placeholder:"\u041f\u0440\u0456\u0437\u0432\u0438\u0449\u0435",onBlur:N.handleBlur,value:N.values.fename,onChange:A,style:N.touched.fename&&N.errors.fename?{border:"1px solid red"}:{border:"1px solid #009C2C"}})]}),(0,y.jsxs)("label",{htmlFor:"phone",children:["\u0422\u0435\u043b\u0435\u0444\u043e\u043d ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{required:!0,id:"phone",type:"tel",name:"phone",placeholder:"38-000-000-00-00",onBlur:N.handleBlur,value:N.values.phone,onChange:function(e){var l=e.target.value;(l=l.replace(/\D/g,"")).length>3&&l.length<=6?l=l.slice(0,3)+" "+l.slice(3):l.length>6&&(l=l.slice(0,2)+"("+l.slice(2,5)+")"+l.slice(5)),N.setFieldValue("phone",l)},style:N.touched.phone&&N.errors.phone?{border:"1px solid red"}:{border:"1px solid #009C2C"}})]}),(0,y.jsxs)("label",{htmlFor:"email",children:["Email ",(0,y.jsx)("br",{}),(0,y.jsx)("input",{id:"email",type:"email",name:"email",placeholder:"Email",onBlur:N.handleBlur,value:N.values.email,onChange:A,style:N.touched.email&&N.errors.email?{border:"1px solid red"}:{border:"1px solid #009C2C"}})]})]}),(0,y.jsx)("textarea",{type:"text",name:"comments",placeholder:"\u041a\u043e\u043c\u0435\u043d\u0442\u0430\u0440\u0456 \u0434\u043e \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f",onBlur:N.handleBlur,value:N.values.comments,onChange:A,style:{width:"698px",height:"80px",borderRadius:"5px",fontSize:"15px",justifyContent:"center",border:"1px solid #009C2C",padding:"16px"}})]}),(0,y.jsxs)("label",{id:"city",children:["\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u043d\u0430\u0441\u0435\u043b\u0435\u043d\u0438\u0439 \u043f\u0443\u043d\u043a\u0442",(0,y.jsx)(j.Z,{required:!0,renderInput:function(e){return(0,y.jsx)(C.Z,(0,n.Z)({},e))},id:"city",options:b,name:"city",onBlur:N.handleBlur,onChange:A,sx:{width:"735px"}})]}),(0,y.jsxs)("label",{htmlFor:"viddill",children:["\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u0441\u043f\u043e\u0441\u0456\u0431 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438",(0,y.jsx)(j.Z,{required:!0,renderInput:function(e){return(0,y.jsx)(C.Z,(0,n.Z)({},e))},id:"viddill",options:b,name:"viddill",sx:{width:"735px","& .MuiInput-underline":{borderColor:"1px solid #009C2C"}}})]}),(0,y.jsxs)("label",{htmlFor:"viddill",children:["\u0412\u0456\u0434\u0434\u0456\u043b\u0435\u043d\u043d\u044f \u041d\u043e\u0432\u043e\u0457 \u041f\u043e\u0448\u0442\u0438",(0,y.jsx)(j.Z,{required:!0,renderInput:function(e){return(0,y.jsx)(C.Z,(0,n.Z)({},e))},id:"viddill",options:b,name:"viddill",onBlur:N.handleBlur,onChange:A,sx:{width:"735px"}})]}),(0,y.jsxs)("label",{htmlFor:"oplata",children:["\u0412\u0438\u0431\u0435\u0440\u0456\u0442\u044c \u0441\u043f\u043e\u0441\u0456\u0431 \u043e\u043f\u043b\u0430\u0442\u0438",(0,y.jsx)(j.Z,{required:!0,renderInput:function(e){return(0,y.jsx)(C.Z,(0,n.Z)({},e))},id:"oplata",options:b,name:"oplata",onChange:function(e){N.setFieldValue("oplata","\u041f\u0456\u0441\u043b\u044f\u043e\u043f\u043b\u0430\u0442\u0430 \u041d\u043e\u0432\u0430 \u041f\u043e\u0448\u0442\u0430, \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438")},sx:{width:"735px"}})]})]}),(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{className:"formData--buy",children:[(0,y.jsx)("h3",{children:"\u0412\u0430\u0448\u0456 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f:"}),(0,y.jsx)("div",{className:"block__listBuy",children:(0,y.jsx)("ul",{style:{display:"flex",flexDirection:"column",gap:"15px",padding:"16px"},children:S?(0,y.jsx)(m.Z1,{height:"100",width:"100",color:"#4fa94d",wrapperStyle:{justifyContent:"center"},wrapperClass:"",visible:!0,ariaLabel:"three-circles-rotating",outerCircleColor:"",innerCircleColor:"",middleCircleColor:""}):w&&w.length>0&&w.map((function(l){return(0,y.jsx)("li",{className:"block__listBuy--item",children:(0,y.jsxs)(o.rU,{style:{display:"flex"},to:q.isLoggedIn?"/product/".concat(l.id):"/product/".concat(l._id),children:[(0,y.jsx)("img",{className:"block__listBuy--img",src:l.img[0],alt:"img",width:"100px"}),(0,y.jsxs)("div",{children:[(0,y.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,y.jsx)("p",{className:"block__listBuy--name",children:l.name}),(0,y.jsx)("button",{className:"busketDell",textarea:"\u0412\u0430\u0434\u0430\u043b\u0438\u0442\u0438 \u0437 \u043a\u043e\u0448\u0438\u043a\u0430",onClick:function(){return q.isLoggedIn?e((0,u.Qk)(l._id)):e((0,h.tX)(l.id))},children:(0,y.jsx)(g.GnT,{})})]}),(0,y.jsx)("div",{style:{display:"flex"},children:(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"row",gap:"15px",marginLeft:"15px"},children:[(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column"},children:[(0,y.jsx)("span",{style:{lineHeight:"2"},children:"\u0426\u0456\u043d\u0430"}),(0,y.jsxs)("span",{style:{fontSize:"20px"},children:[(0,y.jsx)("span",{style:{border:"1px solid #009C2C",borderRadius:"8px",padding:"0 5px"},children:l.price*l.count})," ","\u0433\u0440\u043d"]})]}),(0,y.jsxs)("div",{style:{display:"flex",flexDirection:"column",lineHeight:"1.5"},children:[(0,y.jsx)("span",{style:{lineHeight:"2"},children:"\u041a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c"}),(0,y.jsx)("label",{style:{border:"1px solid rgb(209, 209, 209)",borderRadius:"5px",textAlign:"center",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",gap:"5px"},children:(0,y.jsx)("input",{type:"number",name:"weight",min:"1",max:"200",step:"1",onChange:function(i){return n=i.target.value,r=l._id,void(q.isLoggedIn?e((0,h._O)({id:r,counter:n,auth:!0})):e((0,h._O)({id:r,counter:n,auth:!1})));var n,r},value:l.count})})]}),(0,y.jsx)("div",{style:{display:"flex",flexDirection:"column"}})]})})]})]})},l._id)}))})})]}),(0,y.jsxs)("p",{style:{textAlign:"end"},children:["\u0420\u0430\u0437\u043e\u043c \u0434\u043e \u043e\u043f\u043b\u0430\u0442\u0438:",(0,y.jsx)("span",{style:{fontWeight:"600"},children:B.toFixed(2)})," \u0433\u0440\u043d"]}),(0,y.jsx)("button",{type:"submit",className:"modal__btn",style:{margin:"15px 0",width:"100%"},children:"\u041e\u0424\u041e\u0420\u041c\u0418\u0422\u0418 \u0417\u0410\u041c\u041e\u0412\u041b\u0415\u041d\u041d\u042f"}),q.isLoggedIn?"":(0,y.jsxs)("p",{style:{textAlign:"end",color:"red",fontWeight:900},children:["\u0414\u043b\u044f \u0432\u0456\u0434\u0441\u043b\u0456\u0434\u043a\u043e\u0432\u0443\u0432\u0430\u043d\u043d\u044f \u0432\u0456\u0434\u043f\u0440\u0430\u0432\u043a\u0438 \u0442\u043e\u0432\u0430\u0440\u0443 \u0430\u0431\u043e ",(0,y.jsx)("br",{})," \u0456\u043d\u0448\u0438\u0445 \u043c\u043e\u0436\u043b\u0438\u0432\u043e\u0441\u0442\u0435\u0439 \u0431\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430 \u043f\u0440\u043e\u0439\u0434\u0456\u0442\u044c \u0430\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0456\u044e \u043d\u0430 \u0441\u0430\u0439\u0442\u0456!"]})]})]}):(0,y.jsx)(y.Fragment,{children:(0,y.jsxs)("p",{style:{textAlign:"center",fontSize:"40px"},children:["\u0423 \u0432\u0430\u0448\u043e\u043c\u0443 \u043a\u043e\u0448\u0438\u043a\u0443 \u043d\u0435\u043c\u0430\u0454 \u0442\u043e\u0432\u0430\u0440\u0456\u0432, \u043f\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044c \u0434\u043e \u043d\u0430\u0448\u043e\u0433\u043e \u043a\u0430\u0442\u0430\u043b\u043e\u0433\u0443 \u0449\u043e\u0431 \u0437\u0434\u0456\u0439\u0441\u043d\u0438\u0442\u0438 \u043f\u043e\u043a\u0443\u043f\u043a\u0443 ",(0,y.jsx)("br",{}),(0,y.jsx)("br",{}),(0,y.jsx)(o.rU,{style:{textAlign:"center",fontSize:"40px",color:"red"},to:"/productBY",children:"\u0422\u0418\u041a!"})]})})]})}}}]);
//# sourceMappingURL=213.b8e11535.chunk.js.map