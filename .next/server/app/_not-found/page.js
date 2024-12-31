(()=>{var e={};e.id=409,e.ids=[409],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4770:e=>{"use strict";e.exports=require("crypto")},665:e=>{"use strict";e.exports=require("dns")},7702:e=>{"use strict";e.exports=require("events")},2048:e=>{"use strict";e.exports=require("fs")},2615:e=>{"use strict";e.exports=require("http")},2694:e=>{"use strict";e.exports=require("http2")},8216:e=>{"use strict";e.exports=require("net")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},153:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},8061:e=>{"use strict";e.exports=require("node:assert")},2761:e=>{"use strict";e.exports=require("node:async_hooks")},2254:e=>{"use strict";e.exports=require("node:buffer")},27:e=>{"use strict";e.exports=require("node:console")},6005:e=>{"use strict";e.exports=require("node:crypto")},5714:e=>{"use strict";e.exports=require("node:diagnostics_channel")},5673:e=>{"use strict";e.exports=require("node:events")},8849:e=>{"use strict";e.exports=require("node:http")},2725:e=>{"use strict";e.exports=require("node:http2")},7503:e=>{"use strict";e.exports=require("node:net")},8846:e=>{"use strict";e.exports=require("node:perf_hooks")},5815:e=>{"use strict";e.exports=require("node:querystring")},4492:e=>{"use strict";e.exports=require("node:stream")},1764:e=>{"use strict";e.exports=require("node:tls")},1041:e=>{"use strict";e.exports=require("node:url")},7261:e=>{"use strict";e.exports=require("node:util")},3746:e=>{"use strict";e.exports=require("node:util/types")},4086:e=>{"use strict";e.exports=require("node:worker_threads")},5628:e=>{"use strict";e.exports=require("node:zlib")},7289:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>h,originalPathname:()=>d,pages:()=>l,routeModule:()=>p,tree:()=>c}),t(5866),t(2523),t(5168);var s=t(3191),i=t(8716),o=t(7922),n=t.n(o),a=t(5231),u={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>a[e]);t.d(r,u);let c=["",{children:["/_not-found",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,2523)),"/Users/michielnoordhoek/Time-Tracker-TSH/src/app/not-found.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,5168)),"/Users/michielnoordhoek/Time-Tracker-TSH/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.bind(t,2523)),"/Users/michielnoordhoek/Time-Tracker-TSH/src/app/not-found.tsx"]}],l=[],d="/_not-found/page",h={require:t,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/_not-found/page",pathname:"/_not-found",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2173:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},5633:(e,r,t)=>{Promise.resolve().then(t.bind(t,2013)),Promise.resolve().then(t.bind(t,3585))},1748:(e,r,t)=>{Promise.resolve().then(t.bind(t,3846))},5303:()=>{},3846:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>i}),t(7577);var s=t(5047);function i(){return(0,s.useRouter)(),null}},2013:(e,r,t)=>{"use strict";t.d(r,{AuthProvider:()=>d,a:()=>h});var s=t(326),i=t(7577),o=t(7833),n=t(5047),a=t(5957);let u={async signIn(e,r){try{return await (0,a.Fb)(o.I,a.a$),(await (0,a.e5)(o.I,e,r)).user}catch(e){throw console.error("Sign in error:",e),Error(e.message||"Failed to sign in")}},async signUp(e,r){try{return await (0,a.Fb)(o.I,a.a$),(await (0,a.Xb)(o.I,e,r)).user}catch(e){throw console.error("Sign up error:",e),Error(e.message||"Failed to sign up")}},async signOut(){try{await (0,a.w7)(o.I)}catch(e){throw console.error("Sign out error:",e),Error(e.message||"Failed to sign out")}},async signInWithGoogle(){try{await (0,a.Fb)(o.I,a.a$);let e=new a.hJ;return(await (0,a.rh)(o.I,e)).user}catch(e){throw console.error("Google sign in error:",e),Error(e.message||"Failed to sign in with Google")}}};var c=t(247);t(6562);let l=(0,i.createContext)(void 0);function d({children:e}){let[r,t]=(0,i.useState)(null),[a,d]=(0,i.useState)(!0),[h,p]=(0,i.useState)(null),x=(0,n.useRouter)(),m=async(e,r)=>{try{p(null),d(!0),await u.signIn(e,r)}catch(e){console.error("Sign in error:",e),p(e.message),d(!1)}},g=async(e,r,t)=>{try{let s=await u.signUp(e,r);s&&await (0,c.pl)((0,c.JU)(o.db,`users/${s.uid}`),{email:e,displayName:t,createdAt:new Date().toISOString()}),x.push("/dashboard")}catch(e){p(e.message)}},f=async()=>{try{await u.signOut(),x.push("/login")}catch(e){p(e.message)}},y=async()=>{try{let e=await u.signInWithGoogle();e&&await (0,c.pl)((0,c.JU)(o.db,`users/${e.uid}`),{email:e.email,displayName:e.displayName,createdAt:new Date().toISOString()},{merge:!0}),x.push("/dashboard")}catch(e){p(e.message)}};return s.jsx(l.Provider,{value:{currentUser:r,loading:a,error:h,signIn:m,signUp:g,signOut:f,signInWithGoogle:y,clearError:()=>p(null)},children:!a&&e})}function h(){let e=(0,i.useContext)(l);if(void 0===e)throw Error("useAuth must be used within an AuthProvider");return e}},3585:(e,r,t)=>{"use strict";t.d(r,{ToastProvider:()=>n,p:()=>a});var s=t(326),i=t(7577);let o=(0,i.createContext)(void 0);function n({children:e}){let[r,t]=(0,i.useState)([]),n=e=>{t(r=>r.filter(r=>r.id!==e))};return(0,s.jsxs)(o.Provider,{value:{toasts:r,showToast:e=>{let r=Math.random().toString(36).substr(2,9);t(t=>[...t,{...e,id:r}]),setTimeout(()=>{n(r)},3e3)},dismissToast:n},children:[e,s.jsx("div",{className:"fixed bottom-0 right-0 z-50 m-4 flex flex-col gap-2",children:r.map(e=>(0,s.jsxs)("div",{className:`rounded-lg p-4 shadow-lg ${"error"===e.type?"bg-red-500 text-white":"success"===e.type?"bg-green-500 text-white":"bg-white text-gray-900"}`,children:[e.title&&s.jsx("h4",{className:"mb-1 font-semibold",children:e.title}),s.jsx("p",{children:e.description})]},e.id))})]})}function a(){let e=(0,i.useContext)(o);if(void 0===e)throw Error("useToast must be used within a ToastProvider");return e}},7833:(e,r,t)=>{"use strict";t.d(r,{I:()=>a,db:()=>u});var s=t(2585),i=t(5957),o=t(247);let n=(0,s.C6)().length>0?(0,s.Mq)():(0,s.ZF)({apiKey:"AIzaSyBaDHrLtTLBb7QViuG2800nLTTaCyY2uy4",authDomain:"timetracker-tsh.firebaseapp.com",projectId:"timetracker-tsh",storageBucket:"timetracker-tsh.firebasestorage.app",messagingSenderId:"515583830047",appId:"1:515583830047:web:2d93143879a9cd015c0d2a"}),a=(0,i.v0)(n),u=(0,o.ad)(n);new i.hJ},5866:(e,r,t)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}}),t(3370);let s=t(9510);t(1159);let i={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{display:"inline-block"},h1:{display:"inline-block",margin:"0 20px 0 0",padding:"0 23px 0 0",fontSize:24,fontWeight:500,verticalAlign:"top",lineHeight:"49px"},h2:{fontSize:14,fontWeight:400,lineHeight:"49px",margin:0}};function o(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("title",{children:"404: This page could not be found."}),(0,s.jsx)("div",{style:i.error,children:(0,s.jsxs)("div",{children:[(0,s.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}),(0,s.jsx)("h1",{className:"next-error-h1",style:i.h1,children:"404"}),(0,s.jsx)("div",{style:i.desc,children:(0,s.jsx)("h2",{style:i.h2,children:"This page could not be found."})})]})})]})}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),e.exports=r.default)},5168:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l,metadata:()=>c});var s=t(9510),i=t(5317),o=t.n(i),n=t(8570);let a=(0,n.createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/context/auth-context.tsx#AuthProvider`);(0,n.createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/context/auth-context.tsx#useAuth`);let u=(0,n.createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/context/toast-context.tsx#ToastProvider`);(0,n.createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/context/toast-context.tsx#useToast`),t(5023);let c={title:"Time Tracker",description:"Track your time and manage your projects"};function l({children:e}){return(0,s.jsxs)("html",{lang:"en",children:[(0,s.jsxs)("head",{children:[s.jsx("meta",{charSet:"utf-8"}),s.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),s.jsx("link",{rel:"icon",href:"/favicon.ico"})]}),s.jsx("body",{className:o().className,children:s.jsx(a,{children:s.jsx(u,{children:e})})})]})}},2523:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(8570).createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/app/not-found.tsx#default`)},5023:()=>{},3370:(e,r,t)=>{"use strict";function s(e){return e&&e.__esModule?e:{default:e}}t.r(r),t.d(r,{_:()=>s,_interop_require_default:()=>s})}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[361],()=>t(7289));module.exports=s})();