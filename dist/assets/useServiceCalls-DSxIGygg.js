import{c as s,o as t,p as n,z as a}from"./index-V5TuFDJE.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u=s("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=s("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]),o={all:["serviceCalls"]};function i(){const r=t();return n({mutationFn:async e=>{throw new Error("SERVICE_CALLS_DISABLED")},onSuccess:()=>{r.invalidateQueries({queryKey:o.all})},onError:e=>{if((e==null?void 0:e.message)==="SERVICE_CALLS_DISABLED"){a("Garson çağırma şu an kullanılamıyor",{icon:"ℹ️"});return}a.error("Talep gönderilemedi")}})}export{u as A,c as M,i as u};
