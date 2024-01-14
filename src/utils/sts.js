import OSS from 'ali-oss'
import { REGION, BUCKET } from '@/constants'
import { getSts } from '@/api/sys'

// 生成OSS实例
export const getOSSClient = async () => {
  const res = await getSts()
  return new OSS({
    // bucket所在地域，例子：oss-cn-beijing
    region: REGION,
    // 从sts服务中返回的临时访问密钥
    accessKeyId: res.Credentials.AccessKeyId,
    accessKeySecret: res.Credentials.AccessKeySecret,
    // sts服务中获取的安全令牌
    stsToken: res.Credentials.SecurityToken,
    // bucket名称
    bucket: BUCKET,
    // 刷新 token，在 token 过期后自动调用（但是并不生效，可能会在后续的版本中修复）
    refreshSTSToken: async () => {
      const res = await getSts()
      return {
        accessKeyId: res.Credentials.AccessKeyId,
        accessKeySecret: res.Credentials.AccessKeySecret,
        stsToken: res.Credentials.SecurityToken
      }
    },
    // 刷新间隔，单位为毫秒
    refreshSTSTokenInterval: 5 * 1000
  })
}
