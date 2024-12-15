import React, { useEffect, useRef, useContext } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';
import { AppContext } from '@/context/app-context';

const pointerInteractionEnabled = false;

// function setExpression(model: Live2DModel, expressionIndex: number) {
//   expressionIndex = parseInt(expressionIndex.toString());
//   if (
//     model &&
//     model.internalModel &&
//     model.internalModel.motionManager &&
//     model.internalModel.motionManager.expressionManager
//   ) {
//     model.internalModel.motionManager.expressionManager.setExpression(expressionIndex);
//     console.info(`>> [x] -> Expression set to: (${expressionIndex})`);
//   }
// }

function makeDraggable(model: Live2DModel) {
  model.interactive = true;
  model.buttonMode = true;
  model.cursor = 'pointer';

  let isDragging = false;
  let startX = 0;
  let startY = 0;

  model.on('pointerdown', (event) => {
    isDragging = true;
    startX = event.data.global.x - model.x;
    startY = event.data.global.y - model.y;
  });

  model.on('pointermove', (event) => {
    if (isDragging) {
      model.x = event.data.global.x - startX;
      model.y = event.data.global.y - startY;
    }
  });

  model.on('pointerup', () => {
    isDragging = false;
  });

  model.on('pointerupoutside', () => {
    isDragging = false;
  });
}

function changeBackgroundImage(imageUrl: string) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundPosition = 'center';
}

export const Live2D: React.FC = () => {
  const { modelInfo, backgroundUrl } = useContext(AppContext)!;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<PIXI.Application | null>(null);
  const modelRef = useRef<Live2DModel | null>(null);

  // Initialize Pixi application
  useEffect(() => {
    if (!appRef.current && canvasRef.current) {
      const app = new PIXI.Application({
        view: canvasRef.current,
        autoStart: true,
        backgroundAlpha: 0,
      });
      appRef.current = app;
    }
  }, []);

  // Register ticker (only once)
  useEffect(() => {
    if (!appRef.current) return;
    Live2DModel.registerTicker(PIXI.Ticker);
  }, []);

  // Resize Pixi application based on parent container size
  const resizeApp = () => {
    if (!appRef.current || !canvasRef.current) return;
    const parent = canvasRef.current.parentElement;
    if (parent) {
      const rect = parent.getBoundingClientRect();
      appRef.current.renderer.resize(rect.width, rect.height);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      resizeApp();
      if (appRef.current && modelRef.current) {
        const app = appRef.current;
        const l2dModel = modelRef.current;
        const initXshift = modelInfo.initialXshift || 0;
        const initYshift = modelInfo.initialYshift || 0;
        l2dModel.x = app.screen.width / 2 - l2dModel.width / 2 + initXshift;
        l2dModel.y = app.screen.height / 2 - l2dModel.height / 2 + initYshift;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [modelInfo]);

  // Load model
  useEffect(() => {
    const loadModel = async () => {
      if (!appRef.current || !modelInfo.url) return;

      const app = appRef.current;

      // Clear old model
      if (modelRef.current) {
        app.stage.removeChild(modelRef.current as unknown as PIXI.DisplayObject);
        modelRef.current.destroy({ children: true, texture: true, baseTexture: true });
        modelRef.current = null;
      }

      try {
        const options = {
          autoInteract: pointerInteractionEnabled,
          autoUpdate: true,
        };

        const models = await Promise.all([
          Live2DModel.from(modelInfo.url, options),
        ]);

        const l2dModel = models[0];
        modelRef.current = l2dModel;
        app.stage.addChild(l2dModel as unknown as PIXI.DisplayObject);

        // Calculate scale based on parent container size
        const scaleX = app.screen.width * modelInfo.kScale;
        const scaleY = app.screen.height * modelInfo.kScale;
        l2dModel.scale.set(Math.min(scaleX, scaleY));

        makeDraggable(l2dModel);

        l2dModel.on('added', () => {
          l2dModel.update(PIXI.Ticker.shared.deltaTime);
        });

        const initXshift = modelInfo.initialXshift || 0;
        const initYshift = modelInfo.initialYshift || 0;
        l2dModel.x = app.screen.width / 2 - l2dModel.width / 2 + initXshift;
        l2dModel.y = app.screen.height / 2 - l2dModel.height / 2 + initYshift;
      } catch (error) {
        console.error("Failed to load Live2D model:", error);
      }
    };

    resizeApp();
    loadModel();
  }, [modelInfo]);

  useEffect(() => {
    if (backgroundUrl) {
      changeBackgroundImage(backgroundUrl);
    }
  }, [backgroundUrl]);

  return (
    <canvas 
      id="canvas" 
      ref={canvasRef} 
    />
  );
};