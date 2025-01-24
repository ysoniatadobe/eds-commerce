/*! Copyright 2024 Adobe
All Rights Reserved. */
import"@dropins/tools/event-bus.js";import"@dropins/tools/recaptcha.js";import{f as l,h as E}from"./network-error.js";const T=e=>({personalEmail:{address:(e==null?void 0:e.email)||""},userAccount:{login:!0},commerce:{commerceScope:{storeCode:(e==null?void 0:e.store_code)||""}}}),S=e=>({userAccount:{logout:!0},commerce:{commerceScope:{storeCode:(e==null?void 0:e.store_code)||""}}}),N=e=>({personalEmail:{address:(e==null?void 0:e.email)||""},userAccount:{updateProfile:e==null?void 0:e.updateProfile},commerce:{commerceScope:{storeCode:(e==null?void 0:e.store_code)||""}}}),D={auth_dropin_user_token:"auth_dropin_user_token",auth_dropin_firstname:"auth_dropin_firstname"},c=3600,I=e=>{var t,o,r,a,m,_,f,g,d,C;return{autocompleteOnStorefront:((o=(t=e==null?void 0:e.data)==null?void 0:t.storeConfig)==null?void 0:o.autocomplete_on_storefront)||!1,minLength:((a=(r=e==null?void 0:e.data)==null?void 0:r.storeConfig)==null?void 0:a.minimum_password_length)||3,requiredCharacterClasses:+((_=(m=e==null?void 0:e.data)==null?void 0:m.storeConfig)==null?void 0:_.required_character_classes_number)||0,createAccountConfirmation:((g=(f=e==null?void 0:e.data)==null?void 0:f.storeConfig)==null?void 0:g.create_account_confirmation)||!1,customerAccessTokenLifetime:((C=(d=e==null?void 0:e.data)==null?void 0:d.storeConfig)==null?void 0:C.customer_access_token_lifetime)*c||c}},O=e=>{const t=e.map(o=>o.message).join(" ");throw Error(t)},U=e=>{document.cookie=`${e}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`},R=async()=>{try{const e=sessionStorage.getItem("storeConfig");let o=(e?JSON.parse(e):{}).customerAccessTokenLifetime;if(!o){const r=await b();sessionStorage.setItem("storeConfig",JSON.stringify(r)),o=(r==null?void 0:r.customerAccessTokenLifetime)||c}return`Max-Age=${o}`}catch(e){return console.error("getCookiesLifetime() Error:",e),`Max-Age=${c}`}};var A=(e=>(e.CREATE_ACCOUNT_EVENT="create-account",e.SIGN_IN="sign-in",e.SIGN_OUT="sign-out",e))(A||{});const s="authContext",h="shopperContext",i={CREATE_ACCOUNT:"create-account",SIGN_IN:"sign-in",SIGN_OUT:"sign-out"};function n(e,t){const o=window.adobeDataLayer||[];o.push({[e]:null}),o.push({[e]:t})}function u(e){(window.adobeDataLayer||[]).push(o=>{const r=o.getState?o.getState():{};o.push({event:e,eventInfo:{...r}})})}function k(e){const t=N(e);n(s,t),u(i.CREATE_ACCOUNT)}function p(e){const t=T(e);n(s,t),n(h,{shopperId:"logged-in"}),u(i.SIGN_IN)}function w(e){const t=S(e);n(s,t),n(h,{shopperId:"guest"}),u(i.SIGN_OUT)}const M=(e,t)=>{const o=sessionStorage.getItem("storeConfig"),a={...o?JSON.parse(o):{},...t};switch(e){case"create-account":k(a);break;case"sign-in":p(a);break;case"sign-out":w(a);break;default:return null}},G=`
  query GET_STORE_CONFIG {
    storeConfig {
      autocomplete_on_storefront
      minimum_password_length
      required_character_classes_number
      store_code
      store_name
      store_group_code
      locale
      create_account_confirmation
      customer_access_token_lifetime
    }
  }
`,b=async()=>await l(G,{method:"GET",cache:"force-cache"}).then(e=>{var t;return(t=e.errors)!=null&&t.length?O(e.errors):I(e)}).catch(E);export{D as C,A as E,R as a,U as d,b as g,O as h,M as p};
