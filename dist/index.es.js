import { j as t } from "./index.es2.js";
import { useState as m, useCallback as n } from "react";
import { MetaMaskLogin as v } from "./index.es3.js";
import { LoadingScreen as C } from "./index.es4.js";
import { NFTGrid as T } from "./index.es5.js";
import { ConfirmationScreen as S } from "./index.es6.js";
import { useNFTFetcher as M } from "./index.es7.js";
/* empty css          */
const d = () => /* @__PURE__ */ t.jsx("div", { className: "nft-logo-container", children: /* @__PURE__ */ t.jsx("img", { src: "./assets/logo.svg", alt: "NFT Media Importer", className: "nft-logo" }) });
function b() {
  const [e, a] = m({
    provider: null,
    address: null,
    selectedNft: null
  }), [g, o] = m(!1), { nfts: p, loading: N, error: l, fetchNFTs: i, verifyNFTOwnership: c } = M(), h = n(async (r) => {
    try {
      const f = await r.getSigner().getAddress();
      a((w) => ({ ...w, provider: r, address: f })), i(f);
    } catch (s) {
      console.error("Error getting signer address:", s), alert("Failed to connect wallet. Please try again.");
    }
  }, [i]), u = n((r) => {
    a((s) => ({ ...s, selectedNft: r })), o(!0);
  }, []), x = n(async () => {
    if (!(!e.selectedNft || !e.address))
      try {
        if (!await c(
          e.address,
          e.selectedNft.contract.address,
          e.selectedNft.tokenId
        )) {
          alert("Ownership verification failed. Please try again.");
          return;
        }
        await window.$framer.addMedia({
          name: e.selectedNft.name || `NFT #${e.selectedNft.tokenId}`,
          url: e.selectedNft.image,
          type: "image"
        }), o(!1), a((s) => ({ ...s, selectedNft: null })), alert("NFT successfully imported to Framer!");
      } catch (r) {
        console.error("Error importing NFT:", r), alert("Failed to import NFT. Please try again.");
      }
  }, [e.selectedNft, e.address, c]), j = n(() => {
    o(!1), a((r) => ({ ...r, selectedNft: null }));
  }, []), y = n(() => {
    e.address && i(e.address);
  }, [e.address, i]), F = () => !e.provider || !e.address ? /* @__PURE__ */ t.jsxs("div", { className: "nft-flex nft-flex-col nft-items-center", children: [
    /* @__PURE__ */ t.jsx(d, {}),
    /* @__PURE__ */ t.jsx(v, { onConnect: h })
  ] }) : N ? /* @__PURE__ */ t.jsx(C, {}) : l ? /* @__PURE__ */ t.jsxs("div", { className: "nft-p-8 nft-text-center", children: [
    /* @__PURE__ */ t.jsx(d, {}),
    /* @__PURE__ */ t.jsxs("div", { className: "nft-text-red-600 nft-mb-4", children: [
      "Error: ",
      l
    ] }),
    /* @__PURE__ */ t.jsx(
      "button",
      {
        onClick: y,
        className: "nft-btn-primary",
        children: "Retry"
      }
    )
  ] }) : /* @__PURE__ */ t.jsxs(t.Fragment, { children: [
    /* @__PURE__ */ t.jsx(d, {}),
    /* @__PURE__ */ t.jsx(T, { nfts: p, onSelect: u }),
    /* @__PURE__ */ t.jsx(
      S,
      {
        nft: e.selectedNft,
        isOpen: g,
        onConfirm: x,
        onCancel: j
      }
    )
  ] });
  return /* @__PURE__ */ t.jsx("div", { className: "nft-page-bg nft-p-6", children: /* @__PURE__ */ t.jsx("div", { className: "nft-max-w-6xl nft-mx-auto", children: F() }) });
}
const $ = {
  title: "NFT Media Importer",
  component: b,
  // Canvas support
  canvas: {
    width: 800,
    height: 600,
    position: "relative"
  },
  // Collection support
  collection: {
    type: "managed",
    modes: ["grid", "list"],
    defaultMode: "grid",
    itemSize: { width: 200, height: 200 },
    gap: 16,
    padding: 16,
    configure: async (e) => ({
      mode: e.mode || "grid",
      itemSize: e.itemSize || { width: 200, height: 200 },
      gap: e.gap || 16,
      padding: e.padding || 16
    }),
    sync: async (e) => e
  }
};
export {
  b as NFTMediaImporter,
  $ as default
};
//# sourceMappingURL=index.es.js.map
