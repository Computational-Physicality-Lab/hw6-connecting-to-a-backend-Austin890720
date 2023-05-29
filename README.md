[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/v4VHUSr5)
# hw6
- 蔡智冠 R11922198
-  這是我deploy的[網址](https://cheery-malabi-4080e2.netlify.app/)
-  我沒有實做加分的項目
-  因為我的做法是當log in時會把DB的資料複製一份到本地端，如果之後需要Add, Remove, Change Quantity才會去動到DB，所以我是在本地端有一份cart的內容DB也會有一份；我遇到的問題就是原本要從DB copy一份到local端，會因為我緊接著下一步就馬上navigate頁面，所以我推測會來不及存到local端，導致我local端的資料有時候會是空的。之後加了.then之類的，讓他按照順序的執行，才可以讓兩邊的資料都是相同的狀態。
