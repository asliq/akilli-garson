import{c as L,o as V,p as Z,z as N,n as _e,r as m,s as fe,j as e,X as ee,k as W,l as je,q as ve,t as be,v as ge,R as Ne,b as te,h as se,w as Me,C as Se,f as ke,U as Be,x as Ce,A as we,m as U}from"./index-V5TuFDJE.js";import{u as Ie,a as $e}from"./useTables-CvM4alnF.js";import{u as Te}from"./useMenu-D0U_sHoc.js";import{u as Pe}from"./useTranslation-BvELsJ5Q.js";import{C as ze}from"./circle-x-CuMTDWg1.js";import{C as ne}from"./credit-card-yVpBCsCq.js";import{P as Ae,B as Fe}from"./printer-DM-emsoy.js";import{W as Le}from"./wallet-Cet6UtzE.js";import{R as Ee}from"./receipt-Cmsqbp8F.js";import{D as ae}from"./dollar-sign-BlCFyPYG.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=L("Calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=L("Merge",[["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}],["path",{d:"M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22",key:"1hyw0i"}],["path",{d:"m20 22-5-5",key:"1m27yz"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=L("Percent",[["line",{x1:"19",x2:"5",y1:"5",y2:"19",key:"1x9vlm"}],["circle",{cx:"6.5",cy:"6.5",r:"2.5",key:"4mh3h7"}],["circle",{cx:"17.5",cy:"17.5",r:"2.5",key:"1mdrzq"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=L("Split",[["path",{d:"M16 3h5v5",key:"1806ms"}],["path",{d:"M8 3H3v5",key:"15dfkv"}],["path",{d:"M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3",key:"1qrqzj"}],["path",{d:"m15 9 6-6",key:"ko1vev"}]]),ie={all:["payments"]};function Oe(){const i=V();return Z({mutationFn:async r=>{throw new Error("PAYMENTS_DISABLED")},onSuccess:r=>{i.invalidateQueries({queryKey:ie.all}),i.invalidateQueries({queryKey:["orders"]}),i.setQueryData(["tables","list"],c=>c==null?void 0:c.map(d=>d.id===r.tableId?{...d,status:"available"}:d)),i.invalidateQueries({queryKey:["tables"]});const a={cash:"Nakit",credit_card:"Kredi Kartı",debit_card:"Banka Kartı",mobile:"Mobil Ödeme",online:"Online"};N.success(`Ödeme alındı: ₺${r.amount+(r.tip||0)} (${a[r.method]})`,{icon:"💳",duration:4e3})},onError:r=>{if((r==null?void 0:r.message)==="PAYMENTS_DISABLED"){N("Ödeme API henüz aktif değil",{icon:"ℹ️"});return}N.error("Ödeme işlemi başarısız!")}})}function De(){const i=V();return Z({mutationFn:async r=>{throw new Error("PAYMENTS_DISABLED")},onSuccess:(r,{tableId:a})=>{i.invalidateQueries({queryKey:ie.all}),i.invalidateQueries({queryKey:["orders"]}),i.invalidateQueries({queryKey:["tables"]}),N.success(`${r.length} parça halinde ödeme alındı`,{icon:"💳"})},onError:r=>{if((r==null?void 0:r.message)==="PAYMENTS_DISABLED"){N("Ödeme API henüz aktif değil",{icon:"ℹ️"});return}N.error("Bölünmüş ödeme işlemi başarısız!")}})}const qe=(i,r,a)=>{const c=window.open("","_blank");if(!c){alert("Lütfen tarayıcınızda pop-up engelleyiciyi kapatın");return}const d=`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fiş - Masa ${r.number}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Courier New', monospace;
          padding: 20px;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .header {
          text-align: center;
          margin-bottom: 20px;
          border-bottom: 2px dashed #000;
          padding-bottom: 15px;
        }
        
        .restaurant-name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .date {
          font-size: 12px;
          color: #666;
          margin-top: 10px;
        }
        
        .table-info {
          margin: 15px 0;
          padding: 10px 0;
          border-bottom: 1px dashed #000;
        }
        
        .table-info div {
          display: flex;
          justify-content: space-between;
          margin: 5px 0;
          font-size: 14px;
        }
        
        .items {
          margin: 15px 0;
        }
        
        .item {
          margin: 10px 0;
          font-size: 14px;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          font-weight: bold;
        }
        
        .item-notes {
          font-size: 12px;
          color: #666;
          margin-top: 3px;
          padding-left: 10px;
        }
        
        .totals {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 2px dashed #000;
        }
        
        .total-row {
          display: flex;
          justify-content: space-between;
          margin: 8px 0;
          font-size: 14px;
        }
        
        .total-row.grand-total {
          font-size: 18px;
          font-weight: bold;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid #000;
        }
        
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          border-top: 2px dashed #000;
          padding-top: 15px;
        }
        
        .footer p {
          margin: 5px 0;
        }
        
        @media print {
          body {
            padding: 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="restaurant-name">${a==null?void 0:a.name}</div>
        <div>${(a==null?void 0:a.address)||""}</div>
        <div>${(a==null?void 0:a.phone)||""}</div>
        <div class="date">${new Date().toLocaleString("tr-TR")}</div>
      </div>
      
      <div class="table-info">
        <div>
          <span>Masa:</span>
          <strong>Masa ${r.number}</span>
        </div>
        <div>
          <span>Garson:</span>
          <span>${i.waiterName||"Garson"}</span>
        </div>
        <div>
          <span>Sipariş No:</span>
          <span>${i.id}</span>
        </div>
      </div>
      
      <div class="items">
        ${i.items.map(u=>`
          <div class="item">
            <div class="item-header">
              <span>${u.quantity}x ${u.name}</span>
              <span>₺${(u.price*u.quantity).toFixed(2)}</span>
            </div>
            ${u.notes?`<div class="item-notes">Not: ${u.notes}</div>`:""}
          </div>
        `).join("")}
      </div>
      
      <div class="totals">
        <div class="total-row">
          <span>Ara Toplam:</span>
          <span>₺${(i.subtotal||i.totalAmount).toFixed(2)}</span>
        </div>
        ${i.discountAmount>0?`
          <div class="total-row" style="color: #22c55e;">
            <span>İndirim:</span>
            <span>-₺${i.discountAmount.toFixed(2)}</span>
          </div>
        `:""}
        <div class="total-row grand-total">
          <span>TOPLAM:</span>
          <span>₺${i.totalAmount.toFixed(2)}</span>
        </div>
      </div>
      
      <div class="footer">
        <p>Bizi tercih ettiğiniz için teşekkür ederiz!</p>
        <p>Afiyet olsun! 🍽️</p>
      </div>
      
      <script>
        window.onload = function() {
          window.print()
          setTimeout(() => window.close(), 500)
        }
      <\/script>
    </body>
    </html>
  `;c.document.write(d),c.document.close()};function Ke(){const i=_e(a=>a.soundEnabled);return{play:m.useCallback(a=>{if(!i)return;const c=fe[a];c&&c()},[i])}}const Qe="_overlay_1dy4n_3",Ge="_modal_1dy4n_16",Ye="_header_1dy4n_44",We="_closeBtn_1dy4n_58",Ue="_currentInfo_1dy4n_75",Xe="_infoCard_1dy4n_81",Je="_tabs_1dy4n_96",Ve="_tab_1dy4n_96",Ze="_active_1dy4n_123",et="_content_1dy4n_129",tt="_description_1dy4n_135",st="_tableGrid_1dy4n_142",nt="_tableBtn_1dy4n_149",at="_selected_1dy4n_165",it="_actionBtn_1dy4n_176",rt="_splitModes_1dy4n_203",ot="_modeBtn_1dy4n_210",lt="_splitControl_1dy4n_235",ct="_counterControl_1dy4n_247",dt="_splitPreview_1dy4n_280",mt="_previewLabel_1dy4n_291",pt="_previewAmount_1dy4n_297",xt="_customSplit_1dy4n_303",ut="_splitInput_1dy4n_310",yt="_splitSummary_1dy4n_337",n={overlay:Qe,modal:Ge,header:Ye,closeBtn:We,currentInfo:Ue,infoCard:Xe,tabs:Je,tab:Ve,active:Ze,content:et,description:tt,tableGrid:st,tableBtn:nt,selected:at,actionBtn:it,splitModes:rt,modeBtn:ot,splitControl:lt,counterControl:ct,splitPreview:dt,previewLabel:mt,previewAmount:pt,customSplit:xt,splitInput:ut,splitSummary:yt},T=i=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",minimumFractionDigits:0}).format(i);function ht({isOpen:i,onClose:r,currentTable:a,availableTables:c,order:d,onTransfer:u,onMerge:M,onSplit:I}){const[y,C]=m.useState("transfer"),[h,w]=m.useState(null),[p,S]=m.useState(2),[x,$]=m.useState([]);if(!i||!a||!d)return null;const k=()=>{if(!h){alert("Lütfen hedef masa seçin");return}u(a.id,h),r()},E=()=>{if(!h){alert("Lütfen birleştirilecek masayı seçin");return}M(a.id,h),r()},R=()=>{const o=d.total/p;I(d.id,Array(p).fill(o)),r()},P=()=>{const o=x.reduce((j,v)=>j+(parseFloat(v)||0),0);if(Math.abs(o-d.total)>.01){alert(`Toplam ${T(d.total)} olmalı. Şu an: ${T(o)}`);return}I(d.id,x.map(j=>parseFloat(j))),r()};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:n.overlay,onClick:r}),e.jsxs("div",{className:n.modal,children:[e.jsxs("div",{className:n.header,children:[e.jsx("h2",{children:"Masa İşlemleri"}),e.jsx("button",{className:n.closeBtn,onClick:r,children:e.jsx(ee,{size:20})})]}),e.jsx("div",{className:n.currentInfo,children:e.jsxs("div",{className:n.infoCard,children:[e.jsxs("span",{children:["Masa ",a.number]}),e.jsx("strong",{children:T(d.total)})]})}),e.jsxs("div",{className:n.tabs,children:[e.jsxs("button",{className:`${n.tab} ${y==="transfer"?n.active:""}`,onClick:()=>C("transfer"),children:[e.jsx(W,{size:18}),"Transfer"]}),e.jsxs("button",{className:`${n.tab} ${y==="merge"?n.active:""}`,onClick:()=>C("merge"),children:[e.jsx(X,{size:18}),"Birleştir"]}),e.jsxs("button",{className:`${n.tab} ${y==="split"?n.active:""}`,onClick:()=>C("split"),children:[e.jsx(A,{size:18}),"Hesap Böl"]})]}),e.jsxs("div",{className:n.content,children:[y==="transfer"&&e.jsxs("div",{className:n.transferSection,children:[e.jsxs("p",{className:n.description,children:["Masa ",a.number,"'deki siparişi başka bir masaya taşıyın"]}),e.jsx("div",{className:n.tableGrid,children:c==null?void 0:c.map(o=>e.jsxs("button",{className:`${n.tableBtn} ${h===o.id?n.selected:""}`,onClick:()=>w(o.id),disabled:o.id===a.id,children:["Masa ",o.number]},o.id))}),e.jsxs("button",{className:n.actionBtn,onClick:k,disabled:!h,children:[e.jsx(W,{size:18}),"Transfer Et"]})]}),y==="merge"&&e.jsxs("div",{className:n.mergeSection,children:[e.jsxs("p",{className:n.description,children:["Masa ",a.number,"'ü başka bir masa ile birleştirin"]}),e.jsx("div",{className:n.tableGrid,children:c==null?void 0:c.filter(o=>o.status==="occupied").map(o=>e.jsxs("button",{className:`${n.tableBtn} ${h===o.id?n.selected:""}`,onClick:()=>w(o.id),disabled:o.id===a.id,children:["Masa ",o.number]},o.id))}),e.jsxs("button",{className:n.actionBtn,onClick:E,disabled:!h,children:[e.jsx(X,{size:18}),"Masaları Birleştir"]})]}),y==="split"&&e.jsxs("div",{className:n.splitSection,children:[e.jsxs("div",{className:n.splitModes,children:[e.jsxs("button",{className:`${n.modeBtn} ${x.length?"":n.active}`,onClick:()=>$([]),children:[e.jsx(Re,{size:18}),"Eşit Böl"]}),e.jsxs("button",{className:`${n.modeBtn} ${x.length?n.active:""}`,onClick:()=>{const o=Array(p).fill("");$(o)},children:[e.jsx(A,{size:18}),"Özel Böl"]})]}),x.length?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:n.customSplit,children:x.map((o,j)=>e.jsxs("div",{className:n.splitInput,children:[e.jsxs("label",{children:["Kişi ",j+1]}),e.jsx("input",{type:"number",value:o,onChange:v=>{const b=[...x];b[j]=v.target.value,$(b)},placeholder:"0.00"})]},j))}),e.jsxs("div",{className:n.splitSummary,children:[e.jsxs("div",{children:["Toplam: ",T(x.reduce((o,j)=>o+(parseFloat(j)||0),0))]}),e.jsxs("div",{children:["Hedef: ",T(d.total)]})]}),e.jsxs("button",{className:n.actionBtn,onClick:P,children:[e.jsx(A,{size:18}),"Hesabı Böl"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:n.splitControl,children:[e.jsx("label",{children:"Kaç kişiye bölünsün?"}),e.jsxs("div",{className:n.counterControl,children:[e.jsx("button",{onClick:()=>S(Math.max(2,p-1)),children:"-"}),e.jsx("span",{children:p}),e.jsx("button",{onClick:()=>S(Math.min(10,p+1)),children:"+"})]})]}),e.jsxs("div",{className:n.splitPreview,children:[e.jsx("div",{className:n.previewLabel,children:"Kişi başı:"}),e.jsx("div",{className:n.previewAmount,children:T(d.total/p)})]}),e.jsxs("button",{className:n.actionBtn,onClick:R,children:[e.jsx(A,{size:18}),"Eşit Böl (",p," Kişi)"]})]})]})]})]})]})}const _t="_orders_1xtfs_3",ft="_ordersHeader_1xtfs_10",jt="_refreshBtn_1xtfs_28",vt="_spinning_1xtfs_48",bt="_spin_1xtfs_48",gt="_printBtn_1xtfs_52",Nt="_filters_1xtfs_77",Mt="_filterBtn_1xtfs_83",St="_active_1xtfs_100",kt="_ordersList_1xtfs_107",Bt="_orderCard_1xtfs_114",Ct="_orderHeader_1xtfs_127",wt="_orderInfo_1xtfs_136",It="_orderNumber_1xtfs_140",$t="_orderMeta_1xtfs_147",Tt="_orderTable_1xtfs_155",Pt="_orderTime_1xtfs_159",zt="_orderWaiter_1xtfs_160",At="_orderSep_1xtfs_166",Ft="_orderStatus_1xtfs_170",Lt="_warning_1xtfs_180",Et="_info_1xtfs_185",Rt="_success_1xtfs_190",Ht="_danger_1xtfs_195",Ot="_orderItems_1xtfs_201",Dt="_orderItem_1xtfs_201",qt="_itemQuantity_1xtfs_218",Kt="_itemName_1xtfs_224",Qt="_itemPrice_1xtfs_229",Gt="_orderFooter_1xtfs_235",Yt="_orderTotal_1xtfs_244",Wt="_orderActions_1xtfs_260",Ut="_actionBtn_1xtfs_265",Xt="_primary_1xtfs_275",Jt="_emptyState_1xtfs_304",Vt="_payment_1xtfs_327",Zt="_paymentBadge_1xtfs_340",es="_modalOverlay_1xtfs_350",ts="_paymentModal_1xtfs_357",ss="_paymentModalHeader_1xtfs_375",ns="_paymentModalTitle_1xtfs_381",as="_modalCloseBtn_1xtfs_399",is="_paymentItems_1xtfs_415",rs="_paymentItem_1xtfs_415",os="_paymentItemQty_1xtfs_432",ls="_paymentItemName_1xtfs_438",cs="_paymentItemPrice_1xtfs_443",ds="_paymentTotal_1xtfs_448",ms="_paymentMethodSection_1xtfs_464",ps="_paymentMethodLabel_1xtfs_470",xs="_paymentMethodGrid_1xtfs_477",us="_paymentMethodBtn_1xtfs_483",ys="_selected_1xtfs_505",hs="_confirmPaymentBtn_1xtfs_512",_s="_paymentSummaryRows_1xtfs_539",fs="_paymentSummaryRow_1xtfs_539",js="_discountAmount_1xtfs_555",vs="_extraPaymentFields_1xtfs_557",bs="_extraField_1xtfs_563",gs="_splitToggle_1xtfs_587",Ns="_splitToggleBtn_1xtfs_593",Ms="_splitControl_1xtfs_614",Ss="_splitPerPerson_1xtfs_632",t={orders:_t,ordersHeader:ft,refreshBtn:jt,spinning:vt,spin:bt,printBtn:gt,filters:Nt,filterBtn:Mt,active:St,ordersList:kt,orderCard:Bt,orderHeader:Ct,orderInfo:wt,orderNumber:It,orderMeta:$t,orderTable:Tt,orderTime:Pt,orderWaiter:zt,orderSep:At,orderStatus:Ft,warning:Lt,info:Et,success:Rt,danger:Ht,orderItems:Ot,orderItem:Dt,itemQuantity:qt,itemName:Kt,itemPrice:Qt,orderFooter:Gt,orderTotal:Yt,orderActions:Wt,actionBtn:Ut,primary:Xt,emptyState:Jt,payment:Vt,paymentBadge:Zt,modalOverlay:es,paymentModal:ts,paymentModalHeader:ss,paymentModalTitle:ns,modalCloseBtn:as,paymentItems:is,paymentItem:rs,paymentItemQty:os,paymentItemName:ls,paymentItemPrice:cs,paymentTotal:ds,paymentMethodSection:ms,paymentMethodLabel:ps,paymentMethodGrid:xs,paymentMethodBtn:us,selected:ys,confirmPaymentBtn:hs,paymentSummaryRows:_s,paymentSummaryRow:fs,discountAmount:js,extraPaymentFields:vs,extraField:bs,splitToggle:gs,splitToggleBtn:Ns,splitControl:Ms,splitPerPerson:Ss},J={pending:{label:"Bekliyor",icon:te,color:"warning"},preparing:{label:"Hazırlanıyor",icon:Se,color:"info"},ready:{label:"Hazır",icon:Me,color:"success"},served:{label:"Servis Edildi",icon:se,color:"success"},completed:{label:"Tamamlandı",icon:ne,color:"success"},cancelled:{label:"İptal",icon:ze,color:"danger"}},ks=[{id:"cash",label:"Nakit",icon:Fe,apiMethod:"cash"},{id:"card",label:"Kart",icon:ne,apiMethod:"credit_card"},{id:"online",label:"Online",icon:ae,apiMethod:"mobile"}],g=i=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",minimumFractionDigits:0}).format(i),Bs=i=>new Date(i).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});function Es(){const[i,r]=m.useState("all"),[a,c]=m.useState(null),[d,u]=m.useState("cash"),[M,I]=m.useState(0),[y,C]=m.useState(0),[h,w]=m.useState(!1),[p,S]=m.useState(2),[x,$]=m.useState(null),{data:k,isLoading:E,isError:R,error:P,refetch:o,isRefetching:j}=je(),{data:v}=Ie(),{data:b}=Te(),F=ve();$e();const re=Oe(),oe=De();be(),ge();const{play:le}=Ke(),{t:z}=Pe(),H=(k==null?void 0:k.filter(s=>i==="all"?!0:i==="active"?["pending","preparing","ready","served"].includes(s.status):s.status===i).sort((s,l)=>new Date(l.createdAt)-new Date(s.createdAt)))||[],O=m.useMemo(()=>{if(!a)return 0;const s=a.total*(M/100);return Math.max(0,a.total-s+y)},[a,M,y]),D=()=>{c(null),u("cash"),I(0),C(0),w(!1),S(2)},K=s=>{c(s),u("cash"),I(0),C(0),w(!1),S(2)},q=(s,l)=>{F.mutate({id:s,status:l})},ce=s=>{window.confirm("Siparişi iptal etmek istediğinize emin misiniz?")&&F.mutate({id:s,status:"cancelled"})},de=()=>{F.mutate({id:a.id,status:"completed"},{onSuccess:()=>{le("payment"),D(),N.success("Sipariş tamamlandı")}})},me=()=>{if(a){de();return}},Q=s=>{const l=v==null?void 0:v.find(_=>_.id==s);return l?l.number:s?String(s).slice(-4):"?"},G=s=>{const l=b==null?void 0:b.find(_=>_.id==s);return l?l.name:"Bilinmeyen Ürün"},pe=s=>{const l=(v==null?void 0:v.find(f=>f.id==s.tableId))||{number:s.tableId},_={...s,items:s.items.map(f=>{const B=b==null?void 0:b.find(he=>he.id==f.menuItemId);return{...f,name:(B==null?void 0:B.name)||"Ürün",price:f.price||(B==null?void 0:B.price)||0}})};qe(_,l,{name:"Lezzet Durağı"})},xe=(s,l)=>{{N("Masa birleştirme henüz kullanılamıyor",{icon:"ℹ️"});return}},ue=(s,l)=>{{N("Masa transferi henüz kullanılamıyor",{icon:"ℹ️"});return}},ye=(s,l)=>{const _=k==null?void 0:k.find(f=>f.id===s);_&&(K(_),w(!0),S(l.length),$(null))},Y=re.isPending||oe.isPending||F.isPending;return E?e.jsx("div",{className:t.orders,children:"Yükleniyor..."}):R?e.jsxs("div",{className:t.orders,children:[e.jsx("p",{children:"Siparişler yüklenemedi."}),e.jsx("p",{children:P==null?void 0:P.message}),e.jsx("button",{type:"button",onClick:()=>o(),children:"Tekrar Dene"})]}):e.jsxs("div",{className:t.orders,children:[e.jsxs("div",{className:t.ordersHeader,children:[e.jsxs("div",{children:[e.jsx("h1",{children:z("orders.title")}),e.jsxs("p",{children:[H.length," sipariş"]})]}),e.jsx("button",{className:`${t.refreshBtn} ${j?t.spinning:""}`,onClick:()=>o(),children:e.jsx(Ne,{size:18})})]}),e.jsx("div",{className:t.filters,children:[{key:"all",label:"Tümü"},{key:"active",label:"Aktif"},{key:"pending",label:z("orders.statuses.pending")},{key:"preparing",label:z("orders.statuses.preparing")},{key:"ready",label:z("orders.statuses.ready")},{key:"completed",label:z("orders.statuses.completed")}].map(({key:s,label:l})=>e.jsx("button",{className:`${t.filterBtn} ${i===s?t.active:""}`,onClick:()=>r(s),children:l},s))}),e.jsx("div",{className:t.ordersList,children:H.length===0?e.jsxs("div",{className:t.emptyState,children:[e.jsx(te,{size:48}),e.jsx("h3",{children:"Sipariş bulunamadı"}),e.jsx("p",{children:"Seçili filtreye uygun sipariş yok"})]}):H.map(s=>{const l=J[s.status]||J.pending,_=l.icon;return e.jsxs("div",{className:t.orderCard,children:[e.jsxs("div",{className:t.orderHeader,children:[e.jsxs("div",{className:t.orderInfo,children:[e.jsxs("div",{className:t.orderNumber,children:["Sipariş #",s.id]}),e.jsxs("div",{className:t.orderMeta,children:[e.jsxs("span",{className:t.orderTable,children:["Masa ",Q(s.tableId)]}),e.jsx("span",{className:t.orderSep,children:"•"}),e.jsxs("span",{className:t.orderTime,children:[e.jsx(ke,{size:14}),Bs(s.createdAt)]}),s.waiter&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:t.orderSep,children:"•"}),e.jsxs("span",{className:t.orderWaiter,children:[e.jsx(Be,{size:14}),s.waiter]})]})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[Ce.tables,e.jsx("button",{className:t.printBtn,onClick:()=>pe(s),title:"Fiş Yazdır",children:e.jsx(Ae,{size:16})}),e.jsxs("div",{className:`${t.orderStatus} ${t[l.color]}`,children:[e.jsx(_,{size:16}),e.jsx("span",{children:l.label})]})]})]}),e.jsx("div",{className:t.orderItems,children:s.items.map((f,B)=>e.jsxs("div",{className:t.orderItem,children:[e.jsxs("span",{className:t.itemQuantity,children:[f.quantity,"x"]}),e.jsx("span",{className:t.itemName,children:G(f.menuItemId)}),e.jsx("span",{className:t.itemPrice,children:g(f.price*f.quantity)})]},B))}),e.jsxs("div",{className:t.orderFooter,children:[e.jsxs("div",{className:t.orderTotal,children:[e.jsx("span",{children:"Toplam:"}),e.jsx("strong",{children:g(s.total)})]}),e.jsxs("div",{className:t.orderActions,children:[s.status==="pending"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:`${t.actionBtn} ${t.primary}`,onClick:()=>q(s.id,"preparing"),children:"Hazırlamaya Başla"}),e.jsx("button",{className:`${t.actionBtn} ${t.danger}`,onClick:()=>ce(s.id),children:"İptal"})]}),s.status==="preparing"&&e.jsx("button",{className:`${t.actionBtn} ${t.success}`,onClick:()=>q(s.id,"ready"),children:"Hazır"}),s.status==="ready"&&e.jsx("button",{className:`${t.actionBtn} ${t.success}`,onClick:()=>q(s.id,"served"),children:"Servis Et"}),s.status==="served"&&e.jsxs("button",{className:`${t.actionBtn} ${t.payment}`,onClick:()=>K(s),children:[e.jsx(Le,{size:16})," Ödeme Al"]}),s.status==="completed"&&s.paymentMethod&&e.jsx("span",{className:t.paymentBadge,children:s.paymentMethod==="cash"?"💵 Nakit":s.paymentMethod==="card"?"💳 Kart":"📱 Online"})]})]})]},s.id)})}),x&&e.jsx(ht,{isOpen:!!x,onClose:()=>$(null),currentTable:x.table,availableTables:v,order:x.order,onTransfer:ue,onMerge:xe,onSplit:ye}),e.jsx(we,{children:a&&e.jsxs(e.Fragment,{children:[e.jsx(U.div,{className:t.modalOverlay,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:D}),e.jsxs(U.div,{className:t.paymentModal,initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},children:[e.jsxs("div",{className:t.paymentModalHeader,children:[e.jsxs("div",{className:t.paymentModalTitle,children:[e.jsx(Ee,{size:22}),e.jsxs("div",{children:[e.jsx("h2",{children:"Ödeme Al"}),e.jsxs("p",{children:["Sipariş #",a.id," • Masa ",Q(a.tableId)]})]})]}),e.jsx("button",{className:t.modalCloseBtn,onClick:D,children:e.jsx(ee,{size:20})})]}),e.jsxs("div",{className:t.paymentItems,children:[a.items.map((s,l)=>e.jsxs("div",{className:t.paymentItem,children:[e.jsxs("span",{className:t.paymentItemQty,children:[s.quantity,"x"]}),e.jsx("span",{className:t.paymentItemName,children:G(s.menuItemId)}),e.jsx("span",{className:t.paymentItemPrice,children:g(s.price*s.quantity)})]},l)),e.jsxs("div",{className:t.paymentSummaryRows,children:[e.jsxs("div",{className:t.paymentSummaryRow,children:[e.jsx("span",{children:"Ara Toplam"}),e.jsx("span",{children:g(a.total)})]}),M>0&&e.jsxs("div",{className:t.paymentSummaryRow,children:[e.jsxs("span",{children:["İndirim (%",M,")"]}),e.jsxs("span",{className:t.discountAmount,children:["-",g(a.total*M/100)]})]}),y>0&&e.jsxs("div",{className:t.paymentSummaryRow,children:[e.jsx("span",{children:"Bahşiş"}),e.jsx("span",{children:g(y)})]})]}),e.jsxs("div",{className:t.paymentTotal,children:[e.jsx("span",{children:"Toplam"}),e.jsx("strong",{children:g(O)})]})]}),e.jsxs("div",{className:t.extraPaymentFields,children:[e.jsxs("div",{className:t.extraField,children:[e.jsxs("label",{children:[e.jsx(He,{size:14})," İndirim (%)"]}),e.jsx("input",{type:"number",min:"0",max:"100",value:M,onChange:s=>I(Math.min(100,Math.max(0,Number(s.target.value))))})]}),e.jsxs("div",{className:t.extraField,children:[e.jsxs("label",{children:[e.jsx(ae,{size:14})," Bahşiş (₺)"]}),e.jsx("input",{type:"number",min:"0",value:y,onChange:s=>C(Math.max(0,Number(s.target.value)))})]})]}),e.jsxs("div",{className:t.splitToggle,children:[e.jsxs("button",{className:`${t.splitToggleBtn} ${h?t.active:""}`,onClick:()=>w(!h),children:[e.jsx(A,{size:16}),"Hesabı Böl"]}),h&&e.jsxs("div",{className:t.splitControl,children:[e.jsx("button",{onClick:()=>S(Math.max(2,p-1)),children:"−"}),e.jsxs("span",{children:[p," kişi"]}),e.jsx("button",{onClick:()=>S(Math.min(10,p+1)),children:"+"}),e.jsxs("span",{className:t.splitPerPerson,children:["Kişi başı: ",g(O/p)]})]})]}),e.jsxs("div",{className:t.paymentMethodSection,children:[e.jsx("p",{className:t.paymentMethodLabel,children:"Ödeme Yöntemi"}),e.jsx("div",{className:t.paymentMethodGrid,children:ks.map(({id:s,label:l,icon:_})=>e.jsxs("button",{className:`${t.paymentMethodBtn} ${d===s?t.selected:""}`,onClick:()=>u(s),children:[e.jsx(_,{size:24}),e.jsx("span",{children:l})]},s))})]}),e.jsxs("button",{className:t.confirmPaymentBtn,onClick:me,disabled:Y,children:[e.jsx(se,{size:20}),Y?"İşleniyor...":`Ödemeyi Onayla — ${g(O)}`]})]})]})})]})}export{Es as default};
