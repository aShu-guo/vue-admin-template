/**
 * @name createVitePlugins
 * @description 封装plugins数组统一调用
 */
import { PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { splitVendorChunkPlugin } from 'vite';
// import VitePluginCertificate from 'vite-plugin-mkcert';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { ConfigSvgIconsPlugin } from './svgIcons';
import { AutoRegistryComponents } from './component';
import { AutoImportDeps } from './autoImport';
import { ConfigMockPlugin } from './mock';
import { ConfigVisualizerConfig } from './visualizer';
// import { ConfigCompressPlugin } from './compress';
import { ConfigRestartPlugin } from './restart';
import { ConfigProgressPlugin } from './progress';
import { ConfigImageminPlugin } from './imagemin';
import { ConfigConsoleDrop } from './rm-console';
import { ConfigInspect } from './inspect';

export function createVitePlugins(isBuild: boolean, buildEnv: 'prod' | 'test') {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // vue支持
    // reactivityTransform: https://cn.vuejs.org/guide/extras/reactivity-transform.html#retaining-reactivity-across-function-boundaries
    vue({ reactivityTransform: true }),
    // JSX支持
    vueJsx(),
    // setup语法糖组件名支持
    vueSetupExtend(),
    // 提供https证书
    /* VitePluginCertificate({
      source: 'coding',
    }) as PluginOption,*/
    // 默认分包策略
    splitVendorChunkPlugin(),
  ];

  // 自动按需引入组件
  vitePlugins.push(AutoRegistryComponents());

  // 使用API无需import
  vitePlugins.push(AutoImportDeps());

  // 开启.gz压缩
  // vitePlugins.push(ConfigCompressPlugin());

  // 监听配置文件改动重启
  vitePlugins.push(ConfigRestartPlugin());

  // 构建时显示进度条
  vitePlugins.push(ConfigProgressPlugin());

  // vite-plugin-svg-icons
  vitePlugins.push(ConfigSvgIconsPlugin(isBuild));

  // vite-plugin-mock
  vitePlugins.push(ConfigMockPlugin(isBuild));

  // 观察每个插件的中间态
  vitePlugins.push(ConfigInspect());
  /**
   * Always add plugin as last option.
   * 各个bundle占比
   */
  vitePlugins.push(ConfigVisualizerConfig(buildEnv));

  vitePlugins.push(ConfigImageminPlugin());

  // 清除console
  vitePlugins.push(ConfigConsoleDrop(buildEnv));

  return vitePlugins;
}
