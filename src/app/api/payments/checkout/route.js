import { payUnitClient } from "@/lib/payUnit";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, phone, email, name, items } = await req.json();

    const checkoutSession = await payUnitClient.checkout.initialize({
      cancel_url: "https://your-site.com/cancel",
      success_url: "https://your-site.com/success",
      notify_url: "https://your-site.com/webhook",
      currency: "XAF",
      mode: "payment",
      transaction_id: `TXN_${Date.now()}`,
      total_amount: amount,
      payment_country: "CM",
      items: items, // real cart items from frontend
      customer: {
        name: name,
        email: email,
        phone: phone,
      },
      meta: {
        phone_number_collection: true,
        address_collection: true,
      },
    });

    console.log("PayUnit response:", checkoutSession);

    return NextResponse.json({
      success: true,
      checkoutId: checkoutSession,
      // shape: { checkout_id: "PU_LIVE_...", redirect: "https://checkout.payunit.net/..." }
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}