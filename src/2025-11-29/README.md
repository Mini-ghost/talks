# 從 Vite Plugin 出發的編譯器大冒險

Vite 已成現代前端的重要基礎，而 Vite Plugin 也帶來許多有趣且實用的應用。本次分享將聚焦兩個關鍵概念：虛擬模組（virtual import） 與 編譯器宏（compiler macros）。我會以幾個知名的 Vite Plugin 為例，拆解它們如何在建置期產生模組與程式碼、輸出型別，同時分享我在工作中以 Vite Plugin 實作的小工具與經驗。期望透過這些實例與實作思路，啟發會仲審視團隊流程，找出可由 Vite Plugin 改善的環節，進一步提升效能與開發者體驗。
