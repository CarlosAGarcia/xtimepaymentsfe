declare module '@tiptap/starter-kit' ;
declare module '@tiptap/extension-link';
declare module '@tiptap/extension-youtube';
declare module '@tiptap/extension-text-align';
declare module '@tiptap/extension-underline';
// declare module '@tiptap/extension-text-align';

type Section = {
    _id?: string;
    enabled: boolean;
    name: string;
    order?: number;
    backgroundColor: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// org is a ref to the org, sections is an array of Section types
type SiteSettings = {
    org: any;
    isActive: boolean;
    backgroundColor: string;
    sections: Section[];
}

type ADMIN = 'ADMIN'
type USER = 'USER'

type AD_HOC = 'ad_hoc';
type DAILY = 'daily';
type WEEKLY = 'weekly';
type BIWEEKLY = 'biweekly';
type MONTHLY = 'monthly';
type YEARLY = 'yearly';
type BILLING_CYCLE = [AD_HOC, DAILY, WEEKLY, BIWEEKLY, MONTHLY, YEARLY];

type SubscriptionTier = {
    name: string;
    price: number;
    discount: number;
    description: string;
    features: string[];
    billingCycle: AD_HOC | DAILY | WEEKLY | BIWEEKLY | MONTHLY | YEARLY;
    isActive: boolean;
    isDeleted: boolean;
    freeTrialDays: number;
    validFrom: Date;
    validUntil: Date;
}

type UserSubscriptionTier = {
    user: any;
    subscriptionTier: SubscriptionTier;
    isActive: boolean;
    isPaid: boolean;
    validFrom: Date;
    validUntil: Date;
}

type TokenCost = {

}