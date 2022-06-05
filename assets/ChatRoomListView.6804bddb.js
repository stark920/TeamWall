import{a2 as R,a as d,c as p,d as a,b as _,q as n,s as C,j as m,u as k,L as B,r as $,a3 as y,o as j,Z as I,w as b,v as L,y as q,F as D,e as N,H as S,f as T}from"./index.e4e4b507.js";import{_ as U}from"./CardTitle.4cada295.js";import{u as V,a as F}from"./useChat.e30b0051.js";const O={class:"flex items-center"},z={class:"flex-1 pl-3"},A={class:"font-bold"},E={class:"w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap text-sm text-slate-500 md:w-80"},H={class:"text-gray text-xs"},M={props:{room:{type:Object,required:!0,default:()=>{}}},setup(f){const l=f,{handleRoom:t}=V(),{name:r,message:c,avatar:u}=R(l.room),o=e=>e?new Date(e).toLocaleString():"\u5C1A\u672A\u958B\u59CB\u5C0D\u8A71",s=()=>{t(l.room)};return(e,i)=>{var h,g,x,w,v;return d(),p("li",{onClick:s,class:"shadow-normal mb-4 flex h-[77px] cursor-pointer items-center justify-between rounded-lg border-2 border-black bg-white px-4"},[a("div",O,[_(C,{size:"40",imgUrl:(h=n(u))==null?void 0:h.url},null,8,["imgUrl"]),a("div",z,[a("p",A,m(n(r)),1),a("p",E,m((x=(g=n(c))==null?void 0:g[0])==null?void 0:x.message),1)])]),a("span",H,m(o((v=(w=n(c))==null?void 0:w[0])==null?void 0:v.createdAt)),1)])}}},Z={class:"text-center"},G={class:"flex items-center justify-center pt-8"},J=S(" \u8F09\u5165\u4E2D "),W={setup(f){const l=k(),t=B([]),r=$(!0),c=({roomId:o,msg:s})=>{const e=t.findIndex(i=>i.roomId===o);e>-1&&(t[e].message=[s])};y.on("updateChatRecord",c);const u=async()=>{var o;try{r.value=!0;const s=await F.record(),{data:{status:e,chatRecord:i}}=s;e&&(Object.assign(t,i),console.log("chatList",t))}catch(s){const e=(o=s.response.data)==null?void 0:o.message;e&&l.error(e)}finally{r.value=!1}};return j(()=>{u()}),I(()=>{y.off("updateChatRecord",c)}),(o,s)=>(d(),p("section",null,[_(U,{title:"\u804A\u5929\u5BA4"}),a("ul",null,[b(a("li",Z," \u7121\u804A\u5929\u8A18\u9304 ",512),[[L,!r.value&&n(t).length===0]]),b(a("li",G,[J,_(q,{class:"ml-1 h-4 w-4 animate-spin"})],512),[[L,r.value]]),(d(!0),p(D,null,N(n(t),e=>(d(),T(M,{key:e==null?void 0:e.roomId,room:e},null,8,["room"]))),128))])]))}};export{W as default};