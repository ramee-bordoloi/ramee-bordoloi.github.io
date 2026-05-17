# Usability Testing: Promo Codes & Loyalty Rewards

Category: Mobile Design, Responsive Design, Web Design
My Role: Product Design, Research, UI Design, UX Design, UX Writing

*Want to know more about how we launched the loyalty program?* [Read here](https://www.notion.so/Launching-Loyalty-Omnichannel-Rewards-Program-20e8b7775f07804f92ddea89fcc9bdae?pvs=21)

## Overview

I redesigned the promo code and loyalty experience. Rewards now live inside the bag alongside promo codes, so users can immediately see what they have. Instead of being auto applied, rewards are selectable, giving shoppers control over which benefits to use and when. The update also introduces a unified promo component, a stackable rewards model, and an informative overlay.

![image.png](Usability%20Testing%20Promo%20Codes%20&%20Loyalty%20Rewards/image.png)

## Objectives

1. Validate whether users can find, understand and successfully apply promo codes and loyalty rewards.
2. Identify friction in copy, layout, and interaction.
3. Assess comprehension of combined rewards (promo + loyalty).
4. Gather actionable feedback to prioritise design, copy, and tech improvements.

## Questions

- Can users locate the promo/reward controls without assistance?
- Do error and success states provide clear guidance?
- How intuitive is stacking (combining) discounts?
- Does the promo overlay aid or obstruct the checkout flow?
- Where do first‑time users struggle during sign‑up and verification?

## Methodology

| Item | Details |
| --- | --- |
| **Approach** | Moderated, in person usability sessions |
| **Duration** | 30–45 min per participant |
| **Devices** | Desktop & Mobile (Chrome) |
| **Participants** | 4 internal colleagues (Ops, Design, Support) |
| **Tested** | Live staging site with new promo UI. Both new & returning user flows |

## Participants (names changed)

- *Andrea* – Customer Ops, Desktop
- *Drake* – Customer Ops, Mobile
- *Samuel* – Customer Ops, Desktop
- *Josefina* – Customer Ops, Mobile

## Scenarios

1. Promo Code Application (valid & invalid)
2. Loyalty Rewards Redemption
3. Promo + Reward Combined application
4. Promo Overlay Interaction
5. First‑Time Customer Flow (sign‑up, email verification, welcome code)

## Findings

### 1. What’s Working Well

- Promo Overlay Placement – Centered, doesn’t obstruct order total.
- Primary CTA – New ‘Apply Promocode’ button reduces reliance on small ‘x’ to close.
- Manual Reward Selection – Users value the control over auto apply.
- Stackable Rewards – Once discovered, all users leveraged combined discounts.
- Account Creation Flow – Sign up and password reset generally smooth.

### 2. Key Friction Points

| Theme | Evidence | Opportunity |
| --- | --- | --- |
| **Sign Out Hover Menu** | *Andrea* needed 7 attempts; Samuel needed 3 | Replace hover with click trigger or extend delay |
| **Confusing Copy** | ‘Cannot be combined’ in *WELCOME10* misleads | Update copy; add tooltip clarifying combinability |
| **Promo Code Input** | Hyphenated codes hard to paste; ‘Apply’ CTA overlooked | Auto strip hyphens; auto submit on Enter |
| **Reward Visibility** | *Josefina* searched *My Account* first | Add rewards shortcut in Account; badge count |
| **Mobile Touch Targets** | Edge icons hard on curved screens | Increase padding; move icons inward |
| **Email Verification** | One account never received email | Audit deliverability & latency |

## Action Items

1. Rework Sign Out Interaction – test static dropdown vs. click to open.
2. Refine Reward & Promo Copy – especially combinability language.
3. Input Field Enhancements – auto format promo codes, highlight ‘Apply’ state.
4. Layout Exploration – two column or tabbed view for Promo vs. Rewards.
5. Account Shortcut – surface Rewards in My Account with summary card.
6. Mobile Edge Padding – add 8‑12 px inward shift for corner icons.
7. Email Verification Audit – check bounce rates, resend logic.

## Impact & Next Steps

- **Planned Validation Round** – Re run the 5 scenarios after implementing quick wins.
- **KPIs to Track** – Promo application success rate, average discount value, checkout completion time.