import{b as f,r as l,aR as P,j as t,at as h,aS as j,aT as B,a1 as E,au as H,aU as k,ar as I,ai as b,aV as C,p as R}from"./sanity-b946bccb.js";const S=f(R)`
  position: relative;
`;function T(s){const{children:o}=s,{collapsed:n}=B();return t.jsx(S,{hidden:n,height:"fill",overflow:"auto",children:o})}function U(s){const{actionHandlers:o,index:n,menuItems:e,menuItemGroups:r,title:i}=s,{features:a}=E();return!(e!=null&&e.length)&&!i?null:t.jsx(H,{actions:t.jsx(k,{menuItems:e,menuItemGroups:r,actionHandlers:o}),backButton:a.backButton&&n>0&&t.jsx(I,{as:b,"data-as":"a",icon:C,mode:"bleed",tooltipProps:{content:"Back"}}),title:i})}function g(s){const{index:o,pane:n,paneKey:e,...r}=s,{child:i,component:a,menuItems:u,menuItemGroups:d,type:y,...p}=n,[c,m]=l.useState(null),{title:x=""}=P(n);return t.jsxs(h,{id:e,minWidth:320,selected:r.isSelected,children:[t.jsx(U,{actionHandlers:c==null?void 0:c.actionHandlers,index:o,menuItems:u,menuItemGroups:d,title:x}),t.jsxs(T,{children:[j.isValidElementType(a)&&l.createElement(a,{...r,...p,ref:m,child:i,paneKey:e}),l.isValidElement(a)&&a]})]})}export{g as default};
