import{c as F,t as se,v as ne,z as A,w as J,o as je,r as f,x as be,j as e,X as ae,n as V,d as ve,e as ge,y as Ne,q as Me,D as Se,R as Ce,b as ie,k as re,E as ke,C as Be,h as we,U as $e,A as Ie,m as Z}from"./index-DpM0fCIQ.js";import{u as Pe}from"./useMenu-CPZHiiql.js";import{u as ze}from"./useTranslation-XzsJBkbb.js";import{C as Te}from"./circle-x-ld_rDBh6.js";import{C as oe}from"./credit-card-DSFTTOh3.js";import{P as Ae}from"./printer-DFw526bh.js";import{W as Fe}from"./wallet--Cbn7P-d.js";import{R as Re}from"./receipt-C8yPivAb.js";import{P as Le}from"./percent-f-LGy_TE.js";import{D as le}from"./dollar-sign-DVpOvzb_.js";import{B as He}from"./banknote-74FMyAyd.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oe=F("ArrowRightLeft",[["path",{d:"m16 3 4 4-4 4",key:"1x1c3m"}],["path",{d:"M20 7H4",key:"zbl0bi"}],["path",{d:"m8 21-4-4 4-4",key:"h9nckh"}],["path",{d:"M4 17h16",key:"g4d7ey"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const De=F("Calculator",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",key:"1nb95v"}],["line",{x1:"8",x2:"16",y1:"6",y2:"6",key:"x4nwl0"}],["line",{x1:"16",x2:"16",y1:"14",y2:"18",key:"wjye3r"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M8 18h.01",key:"lrp35t"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=F("Merge",[["path",{d:"m8 6 4-4 4 4",key:"ybng9g"}],["path",{d:"M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22",key:"1hyw0i"}],["path",{d:"m20 22-5-5",key:"1m27yz"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=F("Split",[["path",{d:"M16 3h5v5",key:"1806ms"}],["path",{d:"M8 3H3v5",key:"15dfkv"}],["path",{d:"M12 22v-8.3a4 4 0 0 0-1.172-2.872L3 3",key:"1qrqzj"}],["path",{d:"m15 9 6-6",key:"ko1vev"}]]),ce={create:async i=>{const c=`RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,{data:n}=await J.post("/payments",{...i,receiptNumber:c,processedAt:new Date().toISOString()});return n},createSplit:async({orderId:i,tableId:c,splits:n})=>{const d=[];for(const l of n){const _=`RCP-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,{data:v}=await J.post("/payments",{orderId:i,tableId:c,amount:l.amount,tip:l.tip||0,method:l.method,status:"completed",receiptNumber:_,processedAt:new Date().toISOString(),splitPayment:!0});d.push(v)}return d}},de={all:["payments"]};function qe(){const i=se();return ne({mutationFn:ce.create,onSuccess:c=>{i.invalidateQueries({queryKey:de.all}),i.invalidateQueries({queryKey:["orders"]}),i.setQueryData(["tables","list"],d=>d==null?void 0:d.map(l=>l.id===c.tableId?{...l,status:"available"}:l)),i.invalidateQueries({queryKey:["tables"]});const n={cash:"Nakit",credit_card:"Kredi Kartı",debit_card:"Banka Kartı",mobile:"Mobil Ödeme",online:"Online"};A.success(`Ödeme alındı: ₺${c.amount+(c.tip||0)} (${n[c.method]})`,{icon:"💳",duration:4e3})},onError:()=>{A.error("Ödeme işlemi başarısız!")}})}function Ke(){const i=se();return ne({mutationFn:ce.createSplit,onSuccess:(c,{tableId:n})=>{i.invalidateQueries({queryKey:de.all}),i.invalidateQueries({queryKey:["orders"]}),i.invalidateQueries({queryKey:["tables"]}),A.success(`${c.length} parça halinde ödeme alındı`,{icon:"💳"})},onError:()=>{A.error("Bölünmüş ödeme işlemi başarısız!")}})}const Ee=(i,c,n)=>{const d=window.open("","_blank");if(!d){alert("Lütfen tarayıcınızda pop-up engelleyiciyi kapatın");return}const l=`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Fiş - Masa ${c.number}</title>
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
        <div class="restaurant-name">${n==null?void 0:n.name}</div>
        <div>${(n==null?void 0:n.address)||""}</div>
        <div>${(n==null?void 0:n.phone)||""}</div>
        <div class="date">${new Date().toLocaleString("tr-TR")}</div>
      </div>
      
      <div class="table-info">
        <div>
          <span>Masa:</span>
          <strong>Masa ${c.number}</span>
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
        ${i.items.map(_=>`
          <div class="item">
            <div class="item-header">
              <span>${_.quantity}x ${_.name}</span>
              <span>₺${(_.price*_.quantity).toFixed(2)}</span>
            </div>
            ${_.notes?`<div class="item-notes">Not: ${_.notes}</div>`:""}
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
  `;d.document.write(l),d.document.close()};function Qe(){const i=je(n=>n.soundEnabled);return{play:f.useCallback(n=>{if(!i)return;const d=be[n];d&&d()},[i])}}const Ge="_overlay_1dy4n_3",Ye="_modal_1dy4n_16",We="_header_1dy4n_44",Ue="_closeBtn_1dy4n_58",Xe="_currentInfo_1dy4n_75",Je="_infoCard_1dy4n_81",Ve="_tabs_1dy4n_96",Ze="_tab_1dy4n_96",et="_active_1dy4n_123",tt="_content_1dy4n_129",st="_description_1dy4n_135",nt="_tableGrid_1dy4n_142",at="_tableBtn_1dy4n_149",it="_selected_1dy4n_165",rt="_actionBtn_1dy4n_176",ot="_splitModes_1dy4n_203",lt="_modeBtn_1dy4n_210",ct="_splitControl_1dy4n_235",dt="_counterControl_1dy4n_247",mt="_splitPreview_1dy4n_280",pt="_previewLabel_1dy4n_291",ut="_previewAmount_1dy4n_297",xt="_customSplit_1dy4n_303",yt="_splitInput_1dy4n_310",ht="_splitSummary_1dy4n_337",a={overlay:Ge,modal:Ye,header:We,closeBtn:Ue,currentInfo:Xe,infoCard:Je,tabs:Ve,tab:Ze,active:et,content:tt,description:st,tableGrid:nt,tableBtn:at,selected:it,actionBtn:rt,splitModes:ot,modeBtn:lt,splitControl:ct,counterControl:dt,splitPreview:mt,previewLabel:pt,previewAmount:ut,customSplit:xt,splitInput:yt,splitSummary:ht},I=i=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",minimumFractionDigits:0}).format(i);function _t({isOpen:i,onClose:c,currentTable:n,availableTables:d,order:l,onTransfer:_,onMerge:v,onSplit:w}){const[h,k]=f.useState("transfer"),[j,B]=f.useState(null),[u,N]=f.useState(2),[p,M]=f.useState([]);if(!i||!n||!l)return null;const S=()=>{if(!j){alert("Lütfen hedef masa seçin");return}_(n.id,j),c()},R=()=>{if(!j){alert("Lütfen birleştirilecek masayı seçin");return}v(n.id,j),c()},L=()=>{const r=l.total/u;w(l.id,Array(u).fill(r)),c()},H=()=>{const r=p.reduce((x,C)=>x+(parseFloat(C)||0),0);if(Math.abs(r-l.total)>.01){alert(`Toplam ${I(l.total)} olmalı. Şu an: ${I(r)}`);return}w(l.id,p.map(x=>parseFloat(x))),c()};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:a.overlay,onClick:c}),e.jsxs("div",{className:a.modal,children:[e.jsxs("div",{className:a.header,children:[e.jsx("h2",{children:"Masa İşlemleri"}),e.jsx("button",{className:a.closeBtn,onClick:c,children:e.jsx(ae,{size:20})})]}),e.jsx("div",{className:a.currentInfo,children:e.jsxs("div",{className:a.infoCard,children:[e.jsxs("span",{children:["Masa ",n.number]}),e.jsx("strong",{children:I(l.total)})]})}),e.jsxs("div",{className:a.tabs,children:[e.jsxs("button",{className:`${a.tab} ${h==="transfer"?a.active:""}`,onClick:()=>k("transfer"),children:[e.jsx(V,{size:18}),"Transfer"]}),e.jsxs("button",{className:`${a.tab} ${h==="merge"?a.active:""}`,onClick:()=>k("merge"),children:[e.jsx(ee,{size:18}),"Birleştir"]}),e.jsxs("button",{className:`${a.tab} ${h==="split"?a.active:""}`,onClick:()=>k("split"),children:[e.jsx(z,{size:18}),"Hesap Böl"]})]}),e.jsxs("div",{className:a.content,children:[h==="transfer"&&e.jsxs("div",{className:a.transferSection,children:[e.jsxs("p",{className:a.description,children:["Masa ",n.number,"'deki siparişi başka bir masaya taşıyın"]}),e.jsx("div",{className:a.tableGrid,children:d==null?void 0:d.map(r=>e.jsxs("button",{className:`${a.tableBtn} ${j===r.id?a.selected:""}`,onClick:()=>B(r.id),disabled:r.id===n.id,children:["Masa ",r.number]},r.id))}),e.jsxs("button",{className:a.actionBtn,onClick:S,disabled:!j,children:[e.jsx(V,{size:18}),"Transfer Et"]})]}),h==="merge"&&e.jsxs("div",{className:a.mergeSection,children:[e.jsxs("p",{className:a.description,children:["Masa ",n.number,"'ü başka bir masa ile birleştirin"]}),e.jsx("div",{className:a.tableGrid,children:d==null?void 0:d.filter(r=>r.status==="occupied").map(r=>e.jsxs("button",{className:`${a.tableBtn} ${j===r.id?a.selected:""}`,onClick:()=>B(r.id),disabled:r.id===n.id,children:["Masa ",r.number]},r.id))}),e.jsxs("button",{className:a.actionBtn,onClick:R,disabled:!j,children:[e.jsx(ee,{size:18}),"Masaları Birleştir"]})]}),h==="split"&&e.jsxs("div",{className:a.splitSection,children:[e.jsxs("div",{className:a.splitModes,children:[e.jsxs("button",{className:`${a.modeBtn} ${p.length?"":a.active}`,onClick:()=>M([]),children:[e.jsx(De,{size:18}),"Eşit Böl"]}),e.jsxs("button",{className:`${a.modeBtn} ${p.length?a.active:""}`,onClick:()=>{const r=Array(u).fill("");M(r)},children:[e.jsx(z,{size:18}),"Özel Böl"]})]}),p.length?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:a.customSplit,children:p.map((r,x)=>e.jsxs("div",{className:a.splitInput,children:[e.jsxs("label",{children:["Kişi ",x+1]}),e.jsx("input",{type:"number",value:r,onChange:C=>{const T=[...p];T[x]=C.target.value,M(T)},placeholder:"0.00"})]},x))}),e.jsxs("div",{className:a.splitSummary,children:[e.jsxs("div",{children:["Toplam: ",I(p.reduce((r,x)=>r+(parseFloat(x)||0),0))]}),e.jsxs("div",{children:["Hedef: ",I(l.total)]})]}),e.jsxs("button",{className:a.actionBtn,onClick:H,children:[e.jsx(z,{size:18}),"Hesabı Böl"]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:a.splitControl,children:[e.jsx("label",{children:"Kaç kişiye bölünsün?"}),e.jsxs("div",{className:a.counterControl,children:[e.jsx("button",{onClick:()=>N(Math.max(2,u-1)),children:"-"}),e.jsx("span",{children:u}),e.jsx("button",{onClick:()=>N(Math.min(10,u+1)),children:"+"})]})]}),e.jsxs("div",{className:a.splitPreview,children:[e.jsx("div",{className:a.previewLabel,children:"Kişi başı:"}),e.jsx("div",{className:a.previewAmount,children:I(l.total/u)})]}),e.jsxs("button",{className:a.actionBtn,onClick:L,children:[e.jsx(z,{size:18}),"Eşit Böl (",u," Kişi)"]})]})]})]})]})]})}const ft="_orders_1xtfs_3",jt="_ordersHeader_1xtfs_10",bt="_refreshBtn_1xtfs_28",vt="_spinning_1xtfs_48",gt="_spin_1xtfs_48",Nt="_printBtn_1xtfs_52",Mt="_filters_1xtfs_77",St="_filterBtn_1xtfs_83",Ct="_active_1xtfs_100",kt="_ordersList_1xtfs_107",Bt="_orderCard_1xtfs_114",wt="_orderHeader_1xtfs_127",$t="_orderInfo_1xtfs_136",It="_orderNumber_1xtfs_140",Pt="_orderMeta_1xtfs_147",zt="_orderTable_1xtfs_155",Tt="_orderTime_1xtfs_159",At="_orderWaiter_1xtfs_160",Ft="_orderSep_1xtfs_166",Rt="_orderStatus_1xtfs_170",Lt="_warning_1xtfs_180",Ht="_info_1xtfs_185",Ot="_success_1xtfs_190",Dt="_danger_1xtfs_195",qt="_orderItems_1xtfs_201",Kt="_orderItem_1xtfs_201",Et="_itemQuantity_1xtfs_218",Qt="_itemName_1xtfs_224",Gt="_itemPrice_1xtfs_229",Yt="_orderFooter_1xtfs_235",Wt="_orderTotal_1xtfs_244",Ut="_orderActions_1xtfs_260",Xt="_actionBtn_1xtfs_265",Jt="_primary_1xtfs_275",Vt="_emptyState_1xtfs_304",Zt="_payment_1xtfs_327",es="_paymentBadge_1xtfs_340",ts="_modalOverlay_1xtfs_350",ss="_paymentModal_1xtfs_357",ns="_paymentModalHeader_1xtfs_375",as="_paymentModalTitle_1xtfs_381",is="_modalCloseBtn_1xtfs_399",rs="_paymentItems_1xtfs_415",os="_paymentItem_1xtfs_415",ls="_paymentItemQty_1xtfs_432",cs="_paymentItemName_1xtfs_438",ds="_paymentItemPrice_1xtfs_443",ms="_paymentTotal_1xtfs_448",ps="_paymentMethodSection_1xtfs_464",us="_paymentMethodLabel_1xtfs_470",xs="_paymentMethodGrid_1xtfs_477",ys="_paymentMethodBtn_1xtfs_483",hs="_selected_1xtfs_505",_s="_confirmPaymentBtn_1xtfs_512",fs="_paymentSummaryRows_1xtfs_539",js="_paymentSummaryRow_1xtfs_539",bs="_discountAmount_1xtfs_555",vs="_extraPaymentFields_1xtfs_557",gs="_extraField_1xtfs_563",Ns="_splitToggle_1xtfs_587",Ms="_splitToggleBtn_1xtfs_593",Ss="_splitControl_1xtfs_614",Cs="_splitPerPerson_1xtfs_632",s={orders:ft,ordersHeader:jt,refreshBtn:bt,spinning:vt,spin:gt,printBtn:Nt,filters:Mt,filterBtn:St,active:Ct,ordersList:kt,orderCard:Bt,orderHeader:wt,orderInfo:$t,orderNumber:It,orderMeta:Pt,orderTable:zt,orderTime:Tt,orderWaiter:At,orderSep:Ft,orderStatus:Rt,warning:Lt,info:Ht,success:Ot,danger:Dt,orderItems:qt,orderItem:Kt,itemQuantity:Et,itemName:Qt,itemPrice:Gt,orderFooter:Yt,orderTotal:Wt,orderActions:Ut,actionBtn:Xt,primary:Jt,emptyState:Vt,payment:Zt,paymentBadge:es,modalOverlay:ts,paymentModal:ss,paymentModalHeader:ns,paymentModalTitle:as,modalCloseBtn:is,paymentItems:rs,paymentItem:os,paymentItemQty:ls,paymentItemName:cs,paymentItemPrice:ds,paymentTotal:ms,paymentMethodSection:ps,paymentMethodLabel:us,paymentMethodGrid:xs,paymentMethodBtn:ys,selected:hs,confirmPaymentBtn:_s,paymentSummaryRows:fs,paymentSummaryRow:js,discountAmount:bs,extraPaymentFields:vs,extraField:gs,splitToggle:Ns,splitToggleBtn:Ms,splitControl:Ss,splitPerPerson:Cs},te={pending:{label:"Bekliyor",icon:ie,color:"warning"},preparing:{label:"Hazırlanıyor",icon:Be,color:"info"},ready:{label:"Hazır",icon:ke,color:"success"},served:{label:"Servis Edildi",icon:re,color:"success"},completed:{label:"Tamamlandı",icon:oe,color:"success"},cancelled:{label:"İptal",icon:Te,color:"danger"}},K=[{id:"cash",label:"Nakit",icon:He,apiMethod:"cash"},{id:"card",label:"Kart",icon:oe,apiMethod:"credit_card"},{id:"online",label:"Online",icon:le,apiMethod:"mobile"}],g=i=>new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",minimumFractionDigits:0}).format(i),ks=i=>new Date(i).toLocaleTimeString("tr-TR",{hour:"2-digit",minute:"2-digit"});function Hs(){const[i,c]=f.useState("all"),[n,d]=f.useState(null),[l,_]=f.useState("cash"),[v,w]=f.useState(0),[h,k]=f.useState(0),[j,B]=f.useState(!1),[u,N]=f.useState(2),[p,M]=f.useState(null),{data:S,isLoading:R,refetch:L,isRefetching:H}=ve(),{data:r}=ge(),{data:x}=Pe(),C=Ne(),T=Me(),E=qe(),Q=Ke(),me=Se(),{play:pe}=Qe(),{t:P}=ze(),O=(S==null?void 0:S.filter(t=>i==="all"?!0:i==="active"?["pending","preparing","ready","served"].includes(t.status):t.status===i).sort((t,o)=>new Date(o.createdAt)-new Date(t.createdAt)))||[],$=f.useMemo(()=>{if(!n)return 0;const t=n.total*(v/100);return Math.max(0,n.total-t+h)},[n,v,h]),D=()=>{d(null),_("cash"),w(0),k(0),B(!1),N(2)},G=t=>{d(t),_("cash"),w(0),k(0),B(!1),N(2)},q=(t,o)=>{C.mutate({id:t,status:o})},ue=t=>{window.confirm("Siparişi iptal etmek istediğinize emin misiniz?")&&C.mutate({id:t,status:"cancelled"})},Y=t=>{var o;(o=K.find(m=>m.id===l))!=null&&o.apiMethod,C.mutate({id:n.id,status:"completed",paymentMethod:l,discount:v,tip:h,finalTotal:$,receiptNumber:t},{onSuccess:()=>{T.mutate({id:n.tableId,status:"available"}),pe("payment"),D()}})},xe=()=>{var o;if(!n)return;const t=((o=K.find(m=>m.id===l))==null?void 0:o.apiMethod)||"cash";if(j&&u>1){const m=$/u;Q.mutate({orderId:n.id,tableId:n.tableId,splits:Array.from({length:u},()=>({amount:m,method:t}))},{onSuccess:y=>{var b;Y((b=y[0])==null?void 0:b.receiptNumber)}});return}E.mutate({orderId:n.id,tableId:n.tableId,amount:$-h,tip:h,method:t,status:"completed",discount:v},{onSuccess:m=>{Y(m.receiptNumber)}})},W=t=>{const o=r==null?void 0:r.find(m=>m.id==t);return o?o.number:t},U=t=>{const o=x==null?void 0:x.find(m=>m.id==t);return o?o.name:"Bilinmeyen Ürün"},ye=t=>{const o=(r==null?void 0:r.find(y=>y.id==t.tableId))||{number:t.tableId},m={...t,items:t.items.map(y=>{const b=x==null?void 0:x.find(fe=>fe.id==y.menuItemId);return{...y,name:(b==null?void 0:b.name)||"Ürün",price:y.price||(b==null?void 0:b.price)||0}})};Ee(m,o,{name:"Lezzet Durağı"})},he=(t,o)=>{p!=null&&p.order&&(me.mutate({orderId:p.order.id,fromTableId:t,toTableId:o}),M(null))},_e=(t,o)=>{const m=S==null?void 0:S.find(y=>y.id===t);m&&(G(m),B(!0),N(o.length),M(null))},X=E.isPending||Q.isPending||C.isPending;return R?e.jsx("div",{className:s.orders,children:"Yükleniyor..."}):e.jsxs("div",{className:s.orders,children:[e.jsxs("div",{className:s.ordersHeader,children:[e.jsxs("div",{children:[e.jsx("h1",{children:P("orders.title")}),e.jsxs("p",{children:[O.length," sipariş"]})]}),e.jsx("button",{className:`${s.refreshBtn} ${H?s.spinning:""}`,onClick:()=>L(),children:e.jsx(Ce,{size:18})})]}),e.jsx("div",{className:s.filters,children:[{key:"all",label:"Tümü"},{key:"active",label:"Aktif"},{key:"pending",label:P("orders.statuses.pending")},{key:"preparing",label:P("orders.statuses.preparing")},{key:"ready",label:P("orders.statuses.ready")},{key:"completed",label:P("orders.statuses.completed")}].map(({key:t,label:o})=>e.jsx("button",{className:`${s.filterBtn} ${i===t?s.active:""}`,onClick:()=>c(t),children:o},t))}),e.jsx("div",{className:s.ordersList,children:O.length===0?e.jsxs("div",{className:s.emptyState,children:[e.jsx(ie,{size:48}),e.jsx("h3",{children:"Sipariş bulunamadı"}),e.jsx("p",{children:"Seçili filtreye uygun sipariş yok"})]}):O.map(t=>{const o=te[t.status]||te.pending,m=o.icon;return e.jsxs("div",{className:s.orderCard,children:[e.jsxs("div",{className:s.orderHeader,children:[e.jsxs("div",{className:s.orderInfo,children:[e.jsxs("div",{className:s.orderNumber,children:["Sipariş #",t.id]}),e.jsxs("div",{className:s.orderMeta,children:[e.jsxs("span",{className:s.orderTable,children:["Masa ",W(t.tableId)]}),e.jsx("span",{className:s.orderSep,children:"•"}),e.jsxs("span",{className:s.orderTime,children:[e.jsx(we,{size:14}),ks(t.createdAt)]}),t.waiter&&e.jsxs(e.Fragment,{children:[e.jsx("span",{className:s.orderSep,children:"•"}),e.jsxs("span",{className:s.orderWaiter,children:[e.jsx($e,{size:14}),t.waiter]})]})]})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[["served","ready","preparing"].includes(t.status)&&e.jsx("button",{className:s.printBtn,onClick:()=>{const y=r==null?void 0:r.find(b=>b.id==t.tableId);M({table:y,order:t})},title:"Masa İşlemleri",children:e.jsx(Oe,{size:16})}),e.jsx("button",{className:s.printBtn,onClick:()=>ye(t),title:"Fiş Yazdır",children:e.jsx(Ae,{size:16})}),e.jsxs("div",{className:`${s.orderStatus} ${s[o.color]}`,children:[e.jsx(m,{size:16}),e.jsx("span",{children:o.label})]})]})]}),e.jsx("div",{className:s.orderItems,children:t.items.map((y,b)=>e.jsxs("div",{className:s.orderItem,children:[e.jsxs("span",{className:s.itemQuantity,children:[y.quantity,"x"]}),e.jsx("span",{className:s.itemName,children:U(y.menuItemId)}),e.jsx("span",{className:s.itemPrice,children:g(y.price*y.quantity)})]},b))}),e.jsxs("div",{className:s.orderFooter,children:[e.jsxs("div",{className:s.orderTotal,children:[e.jsx("span",{children:"Toplam:"}),e.jsx("strong",{children:g(t.total)})]}),e.jsxs("div",{className:s.orderActions,children:[t.status==="pending"&&e.jsxs(e.Fragment,{children:[e.jsx("button",{className:`${s.actionBtn} ${s.primary}`,onClick:()=>q(t.id,"preparing"),children:"Hazırlamaya Başla"}),e.jsx("button",{className:`${s.actionBtn} ${s.danger}`,onClick:()=>ue(t.id),children:"İptal"})]}),t.status==="preparing"&&e.jsx("button",{className:`${s.actionBtn} ${s.success}`,onClick:()=>q(t.id,"ready"),children:"Hazır"}),t.status==="ready"&&e.jsx("button",{className:`${s.actionBtn} ${s.success}`,onClick:()=>q(t.id,"served"),children:"Servis Et"}),t.status==="served"&&e.jsxs("button",{className:`${s.actionBtn} ${s.payment}`,onClick:()=>G(t),children:[e.jsx(Fe,{size:16})," Ödeme Al"]}),t.status==="completed"&&t.paymentMethod&&e.jsx("span",{className:s.paymentBadge,children:t.paymentMethod==="cash"?"💵 Nakit":t.paymentMethod==="card"?"💳 Kart":"📱 Online"})]})]})]},t.id)})}),p&&e.jsx(_t,{isOpen:!!p,onClose:()=>M(null),currentTable:p.table,availableTables:r,order:p.order,onTransfer:he,onMerge:()=>{},onSplit:_e}),e.jsx(Ie,{children:n&&e.jsxs(e.Fragment,{children:[e.jsx(Z.div,{className:s.modalOverlay,initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},onClick:D}),e.jsxs(Z.div,{className:s.paymentModal,initial:{opacity:0,scale:.95,y:20},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:20},children:[e.jsxs("div",{className:s.paymentModalHeader,children:[e.jsxs("div",{className:s.paymentModalTitle,children:[e.jsx(Re,{size:22}),e.jsxs("div",{children:[e.jsx("h2",{children:"Ödeme Al"}),e.jsxs("p",{children:["Sipariş #",n.id," • Masa ",W(n.tableId)]})]})]}),e.jsx("button",{className:s.modalCloseBtn,onClick:D,children:e.jsx(ae,{size:20})})]}),e.jsxs("div",{className:s.paymentItems,children:[n.items.map((t,o)=>e.jsxs("div",{className:s.paymentItem,children:[e.jsxs("span",{className:s.paymentItemQty,children:[t.quantity,"x"]}),e.jsx("span",{className:s.paymentItemName,children:U(t.menuItemId)}),e.jsx("span",{className:s.paymentItemPrice,children:g(t.price*t.quantity)})]},o)),e.jsxs("div",{className:s.paymentSummaryRows,children:[e.jsxs("div",{className:s.paymentSummaryRow,children:[e.jsx("span",{children:"Ara Toplam"}),e.jsx("span",{children:g(n.total)})]}),v>0&&e.jsxs("div",{className:s.paymentSummaryRow,children:[e.jsxs("span",{children:["İndirim (%",v,")"]}),e.jsxs("span",{className:s.discountAmount,children:["-",g(n.total*v/100)]})]}),h>0&&e.jsxs("div",{className:s.paymentSummaryRow,children:[e.jsx("span",{children:"Bahşiş"}),e.jsx("span",{children:g(h)})]})]}),e.jsxs("div",{className:s.paymentTotal,children:[e.jsx("span",{children:"Toplam"}),e.jsx("strong",{children:g($)})]})]}),e.jsxs("div",{className:s.extraPaymentFields,children:[e.jsxs("div",{className:s.extraField,children:[e.jsxs("label",{children:[e.jsx(Le,{size:14})," İndirim (%)"]}),e.jsx("input",{type:"number",min:"0",max:"100",value:v,onChange:t=>w(Math.min(100,Math.max(0,Number(t.target.value))))})]}),e.jsxs("div",{className:s.extraField,children:[e.jsxs("label",{children:[e.jsx(le,{size:14})," Bahşiş (₺)"]}),e.jsx("input",{type:"number",min:"0",value:h,onChange:t=>k(Math.max(0,Number(t.target.value)))})]})]}),e.jsxs("div",{className:s.splitToggle,children:[e.jsxs("button",{className:`${s.splitToggleBtn} ${j?s.active:""}`,onClick:()=>B(!j),children:[e.jsx(z,{size:16}),"Hesabı Böl"]}),j&&e.jsxs("div",{className:s.splitControl,children:[e.jsx("button",{onClick:()=>N(Math.max(2,u-1)),children:"−"}),e.jsxs("span",{children:[u," kişi"]}),e.jsx("button",{onClick:()=>N(Math.min(10,u+1)),children:"+"}),e.jsxs("span",{className:s.splitPerPerson,children:["Kişi başı: ",g($/u)]})]})]}),e.jsxs("div",{className:s.paymentMethodSection,children:[e.jsx("p",{className:s.paymentMethodLabel,children:"Ödeme Yöntemi"}),e.jsx("div",{className:s.paymentMethodGrid,children:K.map(({id:t,label:o,icon:m})=>e.jsxs("button",{className:`${s.paymentMethodBtn} ${l===t?s.selected:""}`,onClick:()=>_(t),children:[e.jsx(m,{size:24}),e.jsx("span",{children:o})]},t))})]}),e.jsxs("button",{className:s.confirmPaymentBtn,onClick:xe,disabled:X,children:[e.jsx(re,{size:20}),X?"İşleniyor...":`Ödemeyi Onayla — ${g($)}`]})]})]})})]})}export{Hs as default};
