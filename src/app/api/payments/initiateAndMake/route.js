import { payUnitClient } from "@/lib/payUnit";
import {  NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, phNumber, order_id } = await req.json();

    const paymentResult = await payUnitClient.collections.initiateAndMakePaymentMobileMoney({
      total_amount: amount,                 // Amount
      currency: "XAF",
      transaction_id: `TXN_${Date.now()}`,
      gateway: "CM_ORANGE",                // Orange money provider
      phone_number: phNumber,               // Customer phone number
      return_url: "https://your-site.com/return",
      notify_url: "https://your-site.com/webhook",
      payment_country: "CM",
      redirect_on_failed: "yes",            // 'yes' or 'no'
      custom_fields: {
        order_id: order_id,
        customer_type: "premium",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Payment request sent to phone",
      data: paymentResult,
    });
  } catch (error) {
    console.error("Error initiating payment:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Payment initiation failed",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}