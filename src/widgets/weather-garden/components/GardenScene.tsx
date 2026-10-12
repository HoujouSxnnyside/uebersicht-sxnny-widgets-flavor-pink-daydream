import { css } from '@emotion/css';
import type { FC } from 'react';
import {
  ASSET_BUNNY_HOLDING_SUN,
  ASSET_BUTTERFLY,
  ASSET_CANDLE_STICK,
  ASSET_CHERRY_BLOSSOM,
  ASSET_DAISY_SUNHAT,
  ASSET_GARDEN_BOOTS,
  ASSET_MINI_WATERING_CAN,
  ASSET_STRAWBERRY_BLOSSOM_PETAL,
  ASSET_WATERING_CAN_TULIPS,
} from '@/shared/assets/images';
import { StickerImage } from '@/shared/components/stickers';

interface GardenSceneProps {
  condition: 'sunny' | 'partlyCloudy' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'night';
}

const sceneContainerStyle = css`
  position: relative;
  width: 100%;
  height: 104px;
  overflow: hidden;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  box-shadow: inset 0 2px 6px rgba(239, 169, 196, 0.15);
`;

const sunnyBackground = css`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(255, 245, 249, 0.95) 50%,
    rgba(253, 235, 243, 0.85) 100%
  );
`;

const cloudyBackground = css`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(248, 243, 250, 0.95) 60%,
    rgba(240, 230, 245, 0.85) 100%
  );
`;

const rainyBackground = css`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.98) 0%,
    rgba(238, 243, 252, 0.95) 60%,
    rgba(245, 235, 245, 0.85) 100%
  );
`;

/* Romantic twilight evening: soft lavender pastel, perfectly cohesive with stationery */
const nightBackground = css`
  background: linear-gradient(
    180deg,
    rgba(255, 253, 255, 0.98) 0%,
    rgba(245, 238, 250, 0.95) 50%,
    rgba(235, 220, 243, 0.88) 100%
  );
`;

const floatingPetalStyle = css`
  position: absolute;
  top: 14px;
  left: 35%;
  animation: floatPetal 4s infinite ease-in-out;

  @keyframes floatPetal {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-6px) rotate(8deg); }
  }
`;

const sunGlowStyle = css`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 75px;
  height: 75px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 220, 180, 0.7) 0%, transparent 70%);
  pointer-events: none;
`;

const rainStreamStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 14px,
    rgba(185, 166, 216, 0.35) 14px,
    rgba(185, 166, 216, 0.35) 15px
  );
  opacity: 0.7;
`;

/**
 * GardenScene — Living botanical conservatory scene utilizing bespoke
 * WebP botanical illustrations and responsive atmospheric lighting.
 */
export const GardenScene: FC<GardenSceneProps> = ({ condition }) => {
  switch (condition) {
    case 'rainy':
    case 'stormy':
    case 'snowy':
      return (
        <div className={`${sceneContainerStyle} ${rainyBackground}`}>
          <div className={rainStreamStyle} />
          <StickerImage
            src={ASSET_GARDEN_BOOTS}
            size={68}
            interactive
            alt="Rainy Day Garden Boots"
          />
          <StickerImage
            src={ASSET_MINI_WATERING_CAN}
            size={62}
            interactive
            glow
            alt="Spring Dew Watering Can"
          />
        </div>
      );

    case 'cloudy':
    case 'partlyCloudy':
      return (
        <div className={`${sceneContainerStyle} ${cloudyBackground}`}>
          <StickerImage
            src={ASSET_BUNNY_HOLDING_SUN}
            size={76}
            interactive
            alt="Bunny Holding Sun Flower"
          />
          <div className={floatingPetalStyle}>
            <StickerImage src={ASSET_STRAWBERRY_BLOSSOM_PETAL} size={32} alt="Floating Petal" />
          </div>
          <StickerImage src={ASSET_DAISY_SUNHAT} size={66} interactive alt="Daisy Sunhat" />
        </div>
      );

    case 'night':
      return (
        <div className={`${sceneContainerStyle} ${nightBackground}`}>
          <StickerImage
            src={ASSET_CANDLE_STICK}
            size={64}
            interactive
            glow
            alt="Soft Garden Candle"
          />
          <StickerImage
            src={ASSET_CHERRY_BLOSSOM}
            size={58}
            interactive
            alt="Night Blooming Cherry Blossom"
          />
        </div>
      );

    default: // sunny / clear
      return (
        <div className={`${sceneContainerStyle} ${sunnyBackground}`}>
          <div className={sunGlowStyle} />
          <StickerImage
            src={ASSET_WATERING_CAN_TULIPS}
            size={78}
            interactive
            glow
            alt="Blooming Tulips in Watering Can"
          />
          <div className={floatingPetalStyle}>
            <StickerImage src={ASSET_BUTTERFLY} size={34} alt="Fluttering Butterfly" />
          </div>
          <StickerImage src={ASSET_DAISY_SUNHAT} size={68} interactive alt="Daisy Sunhat" />
        </div>
      );
  }
};
