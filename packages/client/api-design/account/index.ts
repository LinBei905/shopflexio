import { I18Detail } from "~/types/common"
import { ImmutableId } from "../resources/_common"

export interface PricingDefinition {
  id: ImmutableId
  name: I18Detail
  description?: I18Detail
  price: null | string
  priceSchedule: "monthly"
  quota: {
    email: {
      quota: number
    }
    contact: {
      quota: number
    }
    workflow: {
      quota: number
    }
  }
}

export type PricingType = "free" | "basic" | "advance"

export interface Quota {
  quota: number
  remains: number
  used: number
}

export interface Pricing {
  id: ImmutableId
  type: PricingType
  quota: {
    email: Quota
    workflows: Quota
    contact: Quota
    shop: Quota
  }
}

// ========================== API ======================
// 获取当前用户账号信息。
// Req /path-to-retrieve-user-billing
export interface GetPricingQuery {}
export interface GetPricingReturn {
  data: Pricing
}

// Req /path-to-payment
export interface UpgradePricingBody {
  type: PricingType
}
