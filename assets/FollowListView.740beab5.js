import{_ as v}from"./CardTitle.af463452.js";import{P as y}from"./PostEmptyCard.632e8d25.js";import{A as k,B as b,J as w,r as _,o as x,a as s,c as o,b as D,F as m,e as A,f as B,g as C,d as a,k as L,j as c,l as f}from"./index.3adf9de5.js";const F=k.create({baseURL:`${b}/users/follows`,timeout:2e4}),I=()=>localStorage.getItem("metaWall")?{headers:{Authorization:localStorage.getItem("metaWall")}}:!1,M={getAll:()=>F.get("",I())},d=(i,r="YYYY/MM/DD HH:mm")=>w(i).format(r),Y={key:0},$={class:"flex items-center"},j={class:"h-10 w-10 rounded-full bg-secondary"},N=["src","alt"],P=["onClick"],R={class:"hover:text-blue_x font-extrabold hover:underline"},S={class:"text-gray_m text-sm"},V={class:"text-sm"},E=a("p",{class:"p-8 text-center text-subtitle"}," \u76EE\u524D\u5C1A\u7121\u8FFD\u8E64\u540D\u55AE\uFF0C\u8FFD\u8E64\u5176\u4ED6\u4EBA\u5427\uFF01 ",-1),z={setup(i){const r=_(!1),l=_([]),h=d(new Date),g=()=>{r.value=!0,M.getAll().then(t=>{t.data.data&&(r.value=!1,l.value=t.data.data)}).catch(t=>{console.error(t)})},p=t=>{var u=new Date(h),e=new Date(t),n=parseInt(Math.abs(u-e)/1e3/60/60/24);return n};return x(()=>{g()}),(t,u)=>(s(),o(m,null,[D(v,{title:"\u8FFD\u8E64\u540D\u55AE"}),l.value.length>0?(s(),o("ul",Y,[(s(!0),o(m,null,A(l.value,(e,n)=>(s(),o("li",{key:n,class:"mb-4 flex items-end justify-between rounded-lg border-2 border-black bg-white p-4 shadow-post"},[a("div",$,[a("div",j,[e.avatar?(s(),o("img",{key:0,src:e.avatar,alt:e.name},null,8,N)):L("",!0)]),a("div",{class:"ml-4 cursor-pointer",onClick:H=>t.$emit("change-key",e.key)},[a("p",R,c(e.name),1),a("p",S," \u8FFD\u8E64\u6642\u9593\uFF1A"+c(f(d)(e.createdAt)),1)],8,P)]),a("div",V," \u60A8\u5DF2\u8FFD\u8E64 "+c(p(f(d)(e.createdAt)))+" \u5929\uFF01 ",1)]))),128))])):(s(),B(y,{key:1},{default:C(()=>[E]),_:1}))],64))}};export{z as default};
