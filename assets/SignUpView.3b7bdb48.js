import{L as k,r as p,p as z,i as M,a as i,c as u,d as t,w as d,x as w,q as a,j as m,k as h,v as V,b,y as B,g as N,z as U,B as q,N as C,J as L}from"./index.e7c7c9fd.js";import{c as r,r as f,m as D,e as K,u as S}from"./index.esm.81949ab7.js";const T=["onKeyup"],j=t("li",{class:"mb-8 w-full text-center text-2xl font-bold"},"\u8A3B\u518A\u65B0\u5E33\u865F",-1),A={class:"mb-4 w-full"},E={key:0,class:"font-azeret text-alert"},Z={class:"mb-4 w-full"},I={key:0,class:"font-azeret text-alert"},J={class:"mb-8 w-full"},P={key:0,class:"font-azeret text-alert"},R={class:"mb-2 text-center text-alert"},F={class:"mb-4 w-full"},G=["disabled"],H=t("span",null,"\u8A3B\u518A",-1),O={class:"text-center"},Q=L("\u767B\u5165"),ee={setup(W){const _=k(),o=p({name:"",email:"",password:""}),x=z(()=>({name:{required:r.withMessage("\u66B1\u7A31\u5FC5\u586B",f),minLength:r.withMessage("\u66B1\u7A31\u81F3\u5C11 2 \u500B\u5B57\u5143\u4EE5\u4E0A",D(2))},email:{required:r.withMessage("email \u5FC5\u586B",f),email:r.withMessage("email \u683C\u5F0F\u932F\u8AA4",K)},password:{required:r.withMessage("\u5BC6\u78BC\u5FC5\u586B",f),alphaNum:r.withMessage("\u5BC6\u78BC\u9700\u81F3\u5C11 8 \u78BC\u4EE5\u4E0A\uFF0C\u4E26\u82F1\u6578\u6DF7\u5408",r.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,/\d/))}})),s=S(x,o.value),n=p(!1),c=p("");function g(){o.value.email="",o.value.password="",n.value=!1}const v=async()=>{!await s.value.$validate()||(n.value=!0,C.signUp(o.value).then(e=>{g(),alert(e.data.message),_.push({name:"sign-in"})}).catch(e=>{c.value=e.message,g(),setTimeout(()=>{c.value=""},2e3)}))};return(y,e)=>{const $=M("router-link");return i(),u("ul",{class:"w-full",onKeyup:U(q(v,["exact"]),["enter"])},[j,t("li",A,[d(t("input",{class:"w-full border-2 border-black py-4 px-6 font-azeret",type:"text",placeholder:"\u66B1\u7A31","onUpdate:modelValue":e[0]||(e[0]=l=>o.value.name=l),onBlur:e[1]||(e[1]=(...l)=>a(s).name.$touch&&a(s).name.$touch(...l))},null,544),[[w,o.value.name]]),a(s).name.$errors.length>0?(i(),u("div",E,m(a(s).name.$errors[0].$message),1)):h("",!0)]),t("li",Z,[d(t("input",{class:"w-full border-2 border-black py-4 px-6 font-azeret",type:"email",placeholder:"Email","onUpdate:modelValue":e[2]||(e[2]=l=>o.value.email=l),onBlur:e[3]||(e[3]=(...l)=>a(s).email.$touch&&a(s).email.$touch(...l))},null,544),[[w,o.value.email]]),a(s).email.$errors.length>0?(i(),u("div",I,m(a(s).email.$errors[0].$message),1)):h("",!0)]),t("li",J,[d(t("input",{class:"w-full border-2 border-black py-4 px-6 font-azeret",type:"password",placeholder:"Password","onUpdate:modelValue":e[4]||(e[4]=l=>o.value.password=l),onBlur:e[5]||(e[5]=(...l)=>a(s).password.$touch&&a(s).password.$touch(...l))},null,544),[[w,o.value.password]]),a(s).password.$errors.length>0?(i(),u("div",P,m(a(s).password.$errors[0].$message),1)):h("",!0)]),t("li",R,[t("p",null,m(c.value),1)]),t("li",F,[t("button",{class:"flex w-full items-center justify-center rounded-lg border-2 border-black bg-primary py-2 text-lg text-white hover:bg-warning hover:text-black disabled:bg-disabled",onClick:v,disabled:n.value},[H,d(b(B,{class:"ml-1 h-4 w-4 animate-spin"},null,512),[[V,n.value]])],8,G)]),t("li",O,[b($,{to:"sign-in"},{default:N(()=>[Q]),_:1})])],40,T)}}};export{ee as default};