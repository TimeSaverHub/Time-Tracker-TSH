(()=>{var e={};e.id=966,e.ids=[966],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4770:e=>{"use strict";e.exports=require("crypto")},665:e=>{"use strict";e.exports=require("dns")},7702:e=>{"use strict";e.exports=require("events")},2048:e=>{"use strict";e.exports=require("fs")},2615:e=>{"use strict";e.exports=require("http")},2694:e=>{"use strict";e.exports=require("http2")},8216:e=>{"use strict";e.exports=require("net")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},5816:e=>{"use strict";e.exports=require("process")},6162:e=>{"use strict";e.exports=require("stream")},4026:e=>{"use strict";e.exports=require("string_decoder")},2452:e=>{"use strict";e.exports=require("tls")},7360:e=>{"use strict";e.exports=require("url")},153:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},8061:e=>{"use strict";e.exports=require("node:assert")},2761:e=>{"use strict";e.exports=require("node:async_hooks")},2254:e=>{"use strict";e.exports=require("node:buffer")},27:e=>{"use strict";e.exports=require("node:console")},6005:e=>{"use strict";e.exports=require("node:crypto")},5714:e=>{"use strict";e.exports=require("node:diagnostics_channel")},5673:e=>{"use strict";e.exports=require("node:events")},8849:e=>{"use strict";e.exports=require("node:http")},2725:e=>{"use strict";e.exports=require("node:http2")},7503:e=>{"use strict";e.exports=require("node:net")},8846:e=>{"use strict";e.exports=require("node:perf_hooks")},9630:e=>{"use strict";e.exports=require("node:querystring")},4492:e=>{"use strict";e.exports=require("node:stream")},1764:e=>{"use strict";e.exports=require("node:tls")},1041:e=>{"use strict";e.exports=require("node:url")},7261:e=>{"use strict";e.exports=require("node:util")},3746:e=>{"use strict";e.exports=require("node:util/types")},4086:e=>{"use strict";e.exports=require("node:worker_threads")},5628:e=>{"use strict";e.exports=require("node:zlib")},6367:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>l,routeModule:()=>m,tree:()=>c}),t(7240),t(2257),t(5866);var s=t(3191),i=t(8716),a=t(7922),o=t.n(a),n=t(5231),u={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(u[e]=()=>n[e]);t.d(r,u);let c=["",{children:["signup",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,7240)),"/Users/michielnoordhoek/Time-Tracker-TSH/src/app/signup/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,2257)),"/Users/michielnoordhoek/Time-Tracker-TSH/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,5866,23)),"next/dist/client/components/not-found-error"]}],l=["/Users/michielnoordhoek/Time-Tracker-TSH/src/app/signup/page.tsx"],d="/signup/page",p={require:t,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:i.x.APP_PAGE,page:"/signup/page",pathname:"/signup",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},2173:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,2994,23)),Promise.resolve().then(t.t.bind(t,6114,23)),Promise.resolve().then(t.t.bind(t,9727,23)),Promise.resolve().then(t.t.bind(t,9671,23)),Promise.resolve().then(t.t.bind(t,1868,23)),Promise.resolve().then(t.t.bind(t,4759,23))},6038:(e,r,t)=>{Promise.resolve().then(t.bind(t,9897))},2699:(e,r,t)=>{Promise.resolve().then(t.bind(t,1042))},1042:(e,r,t)=>{"use strict";t.d(r,{SignUpForm:()=>p});var s=t(326),i=t(7577),a=t(5047),o=t(434),n=t(1664),u=t(1190),c=t(4794),l=t(2082),d=t(3882);function p(){let[e,r]=(0,i.useState)(""),[t,p]=(0,i.useState)(""),[m,x]=(0,i.useState)(""),[h,f]=(0,i.useState)(""),[g,v]=(0,i.useState)(null),[y,b]=(0,i.useState)(!1),w=(0,a.useRouter)(),{signUp:q}=(0,l.a)(),j=async r=>{if(r.preventDefault(),v(null),t!==m){v("Passwords do not match");return}if(t.length<6){v("Password must be at least 6 characters long");return}b(!0);try{await q(e,t,h),w.push("/dashboard")}catch(e){v("Error creating account. Please try again.")}finally{b(!1)}};return(0,s.jsxs)("form",{onSubmit:j,className:"space-y-6",children:[(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(c._,{htmlFor:"name",children:"Full Name"}),s.jsx(u.I,{id:"name",type:"text",value:h,onChange:e=>f(e.target.value),required:!0,placeholder:"Enter your full name",className:"w-full",autoComplete:"name"})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(c._,{htmlFor:"email",children:"Email"}),s.jsx(u.I,{id:"email",type:"email",value:e,onChange:e=>r(e.target.value),required:!0,placeholder:"Enter your email",className:"w-full",autoComplete:"email"})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(c._,{htmlFor:"password",children:"Password"}),s.jsx(u.I,{id:"password",type:"password",value:t,onChange:e=>p(e.target.value),required:!0,placeholder:"Create a password",className:"w-full",autoComplete:"new-password",minLength:6})]}),(0,s.jsxs)("div",{className:"space-y-2",children:[s.jsx(c._,{htmlFor:"confirmPassword",children:"Confirm Password"}),s.jsx(u.I,{id:"confirmPassword",type:"password",value:m,onChange:e=>x(e.target.value),required:!0,placeholder:"Confirm your password",className:"w-full",autoComplete:"new-password",minLength:6})]}),g&&s.jsx("div",{className:"text-sm text-red-500 text-center",children:g}),s.jsx(n.z,{type:"submit",className:"w-full",disabled:y,children:y?s.jsx(d.T,{}):"Create Account"}),(0,s.jsxs)("div",{className:"text-center text-sm",children:["Already have an account?"," ",s.jsx(o.default,{href:"/",className:"font-semibold text-primary hover:underline",children:"Sign in"})]})]})}},3882:(e,r,t)=>{"use strict";t.d(r,{T:()=>i});var s=t(326);function i(){return s.jsx("div",{className:"flex justify-center items-center",children:s.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"})})}t(7577)},1664:(e,r,t)=>{"use strict";t.d(r,{z:()=>c});var s=t(326),i=t(7577),a=t(6438),o=t(9360),n=t(1223);let u=(0,o.j)("inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",{variants:{variant:{default:"bg-primary text-primary-foreground shadow hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",outline:"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-9 px-4 py-2",sm:"h-8 rounded-md px-3 text-xs",lg:"h-10 rounded-md px-8",icon:"h-9 w-9"}},defaultVariants:{variant:"default",size:"default"}}),c=i.forwardRef(({className:e,variant:r,size:t,asChild:i=!1,...o},c)=>{let l=i?a.g7:"button";return s.jsx(l,{className:(0,n.cn)(u({variant:r,size:t,className:e})),ref:c,...o})});c.displayName="Button"},1190:(e,r,t)=>{"use strict";t.d(r,{I:()=>o});var s=t(326),i=t(7577),a=t(1223);let o=i.forwardRef(({className:e,type:r,...t},i)=>s.jsx("input",{type:r,className:(0,a.cn)("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",e),ref:i,...t}));o.displayName="Input"},4794:(e,r,t)=>{"use strict";t.d(r,{_:()=>c});var s=t(326),i=t(7577),a=t(7281),o=t(9360),n=t(1223);let u=(0,o.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),c=i.forwardRef(({className:e,...r},t)=>s.jsx(a.f,{ref:t,className:(0,n.cn)(u(),e),...r}));c.displayName=a.f.displayName},9897:(e,r,t)=>{"use strict";t.d(r,{AuthProvider:()=>p,a:()=>m});var s=t(326),i=t(7577),a=t(6791),o=t(247),n=t(2585);let u=(0,n.C6)().length>0?(0,n.Mq)():(0,n.ZF)({apiKey:"AIzaSyBaDHrLtTLBb7QViuG2800nLTTaCyY2uy4",authDomain:"timetracker-tsh.firebaseapp.com",projectId:"timetracker-tsh",storageBucket:"timetracker-tsh.firebasestorage.app",messagingSenderId:"515583830047",appId:"1:515583830047:web:2d93143879a9cd015c0d2a"}),c=(0,a.v0)(u),l=(0,o.ad)(u),d=(0,i.createContext)(null);function p({children:e}){let[r,t]=(0,i.useState)(null),[n,u]=(0,i.useState)(!0),[p,m]=(0,i.useState)(null),x=async(e,r)=>{try{await (0,a.e5)(c,e,r)}catch(e){throw m(e instanceof Error?e:Error("Failed to sign in")),e}},h=async(e,r,s)=>{try{let{user:i}=await (0,a.Xb)(c,e,r);await (0,o.pl)((0,o.JU)(l,"users",i.uid),{email:e,name:s,createdAt:new Date}),t({id:i.uid,email:i.email,name:s})}catch(e){throw m(e instanceof Error?e:Error("Failed to sign up")),e}},f=async()=>{try{await (0,a.w7)(c),t(null)}catch(e){throw m(e instanceof Error?e:Error("Failed to sign out")),e}};return s.jsx(d.Provider,{value:{user:r,loading:n,error:p,signIn:x,signUp:h,signOut:f},children:e})}function m(){let e=(0,i.useContext)(d);if(!e)throw Error("useAuth must be used within an AuthProvider");return e}},2082:(e,r,t)=>{"use strict";t.d(r,{a:()=>s.a});var s=t(9897)},1223:(e,r,t)=>{"use strict";t.d(r,{cn:()=>a});var s=t(1135),i=t(1009);function a(...e){return(0,i.m6)((0,s.W)(e))}},2257:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>c,metadata:()=>u});var s=t(9510),i=t(5317),a=t.n(i);t(1159);var o=t(8570);let n=(0,o.createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/context/auth-context.tsx#AuthProvider`);(0,o.createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/context/auth-context.tsx#useAuth`),t(5023);let u={title:"TimeTracker TimeSaverHub",description:"Track your time efficiently"};function c({children:e}){return s.jsx("html",{lang:"en",children:s.jsx("body",{className:a().className,children:s.jsx(n,{children:e})})})}},7240:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var s=t(9510);let i=(0,t(8570).createProxy)(String.raw`/Users/michielnoordhoek/Time-Tracker-TSH/src/components/auth/signup-form.tsx#SignUpForm`);function a(){return s.jsx("div",{className:"flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",children:(0,s.jsxs)("div",{className:"w-full max-w-md space-y-8",children:[(0,s.jsxs)("div",{className:"text-center",children:[s.jsx("h2",{className:"mt-6 text-3xl font-bold tracking-tight",children:"Create an account"}),s.jsx("p",{className:"mt-2 text-sm text-muted-foreground",children:"Enter your details below to create your account"})]}),s.jsx(i,{})]})})}},5023:()=>{}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[12,402],()=>t(6367));module.exports=s})();