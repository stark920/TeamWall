import{_ as E,E as M,K as A,u as G,D as K,r as p,L as $,o as D,h as O,a as u,c as i,d as s,b as m,m as T,j as y,l as c,n as U,w as k,v as x,M as q,k as H,F as S,e as B,f as J,g as Q,y as W,z as X,N as Y,O as Z,P}from"./index.3adf9de5.js";import{_ as ee,a as se}from"./PostLoadingCard.c71dbabe.js";import{P as te}from"./PostEmptyCard.632e8d25.js";import{_ as ae}from"./PostCard.1ddb1c0a.js";import{a as oe}from"./apiChat.ee2da9ab.js";import{a as le}from"./apiPost.96c5c916.js";import"./apiLike.88192f99.js";const R=f=>(W("data-v-20706004"),f=f(),X(),f),re={class:"track relative mb-4 flex rounded-lg border-2 border-black bg-white"},ne={class:"flex w-full justify-between p-4"},ue={key:0,class:"flex items-center justify-center"},ie=R(()=>s("span",null,"\u50B3\u9001\u8A0A\u606F",-1)),ce={key:0},de=R(()=>s("p",{class:"p-8 text-center text-subtitle"}," \u76EE\u524D\u5C1A\u7121\u52D5\u614B\uFF0C\u65B0\u589E\u4E00\u5247\u8CBC\u6587\u5427\uFF01 ",-1)),pe={setup(f){const j=M(),F=A(),I=G(),C=K(),d=p(C.params.id),v=p(!1),n=p(!0),L=async()=>{if(v.value)return;const e={receiver:d.value};try{v.value=!0;const t=await oe.room(e),{data:{status:a,roomId:o,name:l,avatar:h,_id:z}}=t;if(a){if(F.updateRoom({roomId:o,name:l,avatar:h,receiver:z}),Y()!=="desktop"){j.push("/chat-room");return}Z.emit("handleRoom",!0)}}catch(t){console.log("error",t)}finally{v.value=!1}},V=p([]),g=(e=1,t="")=>{let a="new",o="";e===2&&(a="old"),e===3&&(o="hot"),le.getAll(`timeSort=${a}&search=${t}&likesSort=${o}&limit=9999`).then(l=>{n.value=!1,V.value=l.data.data}).catch(l=>{n.value=!1,console.log(l)})},w=$(()=>V.value.filter(e=>{var t;return((t=e.userId)==null?void 0:t._id)===d.value}));D(()=>{g()});const r=p({}),_=()=>{n.value=!0,P.getProfile(d.value).then(e=>{n.value=!1,r.value=e.data.data}).catch(e=>{n.value=!1,console.log(e)})},b=$(()=>{var a;return(r.value.followers?r.value.followers:[]).map(o=>o.user).includes((a=I.user)==null?void 0:a.id)});D(()=>{_()});const N=()=>{b.value?P.deleteFollow(r.value.id).then(()=>{_()}).catch(e=>{console.log(e)}):P.follow(r.value.id).then(()=>{_()}).catch(e=>{console.log(e)})};return O(C,e=>{e.name==="profile"&&e.params.id&&(d.value=e.params.id,g(),_())}),(e,t)=>{var a,o;return u(),i(S,null,[s("div",re,[s("div",null,[m(T,{"img-url":r.value.avatar,size:"80"},null,8,["img-url"])]),s("div",ne,[s("div",null,[s("h2",null,y(r.value.name),1),s("span",null,y((a=r.value.followers)==null?void 0:a.length)+" \u4EBA\u8FFD\u8E64",1)]),d.value!==((o=c(I).user)==null?void 0:o.id)?(u(),i("div",ue,[s("button",{type:"button",class:U(["rounded-lg border-2 border-black px-8 py-1.5 shadow-post hover:bg-primary hover:text-white",c(b)?"bg-secondary":"bg-warning"]),onClick:N},y(c(b)?"\u53D6\u6D88\u8FFD\u8E64":"\u8FFD\u8E64"),3),s("button",{onClick:L,class:"ml-2 flex items-center justify-center rounded-lg border-2 border-black px-6 py-1.5 shadow-post"},[ie,k(m(q,{class:"ml-1 h-4 w-4 animate-spin"},null,512),[[x,v.value]])])])):H("",!0)])]),m(ee,{onGetPosts:g}),k(s("ul",null,[(u(),i(S,null,B(3,l=>s("li",{key:l,class:"mb-4"},[m(se)])),64))],512),[[x,n.value]]),k(s("div",null,[c(w).length>0?(u(),i("ul",ce,[(u(!0),i(S,null,B(c(w),(l,h)=>(u(),i("li",{key:h,class:U({"mb-4":h<c(w).length-1})},[m(ae,{post:l},null,8,["post"])],2))),128))])):(u(),J(te,{key:1},{default:Q(()=>[de]),_:1}))],512),[[x,!n.value]])],64)}}};var be=E(pe,[["__scopeId","data-v-20706004"]]);export{be as default};
