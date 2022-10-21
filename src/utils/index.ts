import moment from 'moment';
import { notification, Modal } from 'antd';
import _throttle from 'lodash/throttle';
import localForage from 'localforage';
import { NOTIFICATION_TYPES } from '@/constants';

const { confirm } = Modal;
/**
 * 全局通知提醒框
 * @param {String} title
 * @param {String} des
 * @param {String} type
 */
const showNotification = _throttle(
  (
    type: 'success' | 'info' | 'warning' | 'error',
    title = NOTIFICATION_TYPES[type],
    des = '...',
    duration = 2,
  ) => {
    notification[type]({
      message: title,
      description: des,
      className: `ccs-model-${type}`,
      duration,
    });
  },
  1000,
  { leading: true, trailing: false },
);

// 确认提示框
const showConfirm = (title: string, content: string = '') =>
  new Promise((resolve) => {
    confirm({
      title,
      content,
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      centered: true,
      onOk() {
        resolve(true);
      },
      onCancel() {
        resolve(false);
      },
    });
  });

/**
 * 有值判断
 * @param val
 * @returns
 */
const isHasData = (val: unknown) => val !== '' && val !== null && val !== undefined;

/**
 * 0  => '01'
 * @param val
 */
const fixedZero = (val: number) => (val * 1 < 10 ? `0${val}` : val);

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
/**
 * 是否为url
 */
const isUrl = (path: string) => reg.test(path);

function getStroage(key: string) {
  return localForage.getItem(key);
}

function setStroage(key: string, value: any) {
  return localForage.setItem(key, value);
}

function removeStroage(key: string) {
  return localForage.removeItem(key);
}

const add0 = (m: number) => {
  return m < 10 ? `0${m}` : m;
};

function formatDate(times: string) {
  // shijianchuo是整数，否则要parseInt转换
  const date = Number(times);
  const time = new Date(date);
  const y = time.getFullYear();
  const m = time.getMonth() + 1;
  const d = time.getDate();
  const h = time.getHours();
  const mm = time.getMinutes();
  const s = time.getSeconds();

  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`;
}

/**
 * 时间string to moment
 * @param val
 * @returns moment
 */
function momentDate(val: string | undefined) {
  if (!val) return undefined;
  return moment(val);
}

/**
 * file类型转base地址
 * @param file
 * @returns
 */
const getImgBase64Url = (file: File) => {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = async (e) => {
      const base64 = e?.target?.result;
      resolve(base64);
    };
  });
};

/**
 * @param  生成随机颜色
 * @returns
 */
const generateRandomHexColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

/**
 * @param 复制到剪切板 copyToClipboard("Hello World!")
 * @returns
 */
/** */
const copyToClipboard = (text: string) =>
  navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.writeText(text);

/**
 * 滚动到顶部
 * @param element
 */
const scrollToTop = (element: Element) =>
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });

/**
 * 隐藏该元素
 * @param el
 */
const hideElement = (el: any, removeFromFlow = false) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  removeFromFlow ? (el.style.display = 'none') : (el.style.visibility = 'hidden');
};

/**
 * 从 URL 中获取参数
 * @param key
 */
const getParamByUrl = (key: string) => {
  const url = new URL(location.href);
  return url.searchParams.get(key);
};

export {
  isUrl,
  isHasData,
  fixedZero,
  getStroage,
  setStroage,
  momentDate,
  showConfirm,
  removeStroage,
  showNotification,
  formatDate,
  getImgBase64Url,
  generateRandomHexColor,
  copyToClipboard,
  scrollToTop,
  hideElement,
  getParamByUrl,
};
