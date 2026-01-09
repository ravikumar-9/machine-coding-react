import {
  Check,
  ClipboardCheck,
  CreditCard,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";
import Card from "../components/ui/Card";
import useStore from "../store/store";
import Button from "../components/ui/button";
import { useState } from "react";
import Input from "../components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  paymentformSchema,
  shippingformSchema,
  stepperformschema,
  type paymentFormType,
  type shippingFormType,
  type stepperformsType,
} from "../schema/stepperformschema";
import React from "react";

const steps = [
  { label: "Cart", icon: ShoppingCart },
  { label: "Shipping", icon: Truck },
  { label: "Payment", icon: CreditCard },
  { label: "Review", icon: ClipboardCheck },
];

const Stepper = () => {
  const { products, increaseQuantity, decreaseQuantity } = useStore();
  const [currentStep, setCurrentStep] = useState(1);

  // form
  const form = useForm<stepperformsType>({
    mode: "onChange",
    resolver: zodResolver(stepperformschema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      upiId: "",
      nameOnCard: "",
    },
  });

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof stepperformsType)[] = [];
    //keyof stepperformtype gives the keys of stepperformType

    if (currentStep === 2) {
      fieldsToValidate = Object.keys(
        shippingformSchema.shape
      ) as (keyof shippingFormType)[];
    } else if (currentStep === 3) {
      fieldsToValidate = Object.keys(
        paymentformSchema.shape
      ) as (keyof paymentFormType)[];
    }

    if (fieldsToValidate.length > 0) {
      const valid = await form.trigger(fieldsToValidate);
      if (!valid) return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handlePlaceOrder = form.handleSubmit((data) => {
    console.log("Final Order Data:", data);
    setCurrentStep(5); // go to success page
  });

  const percentage = ((currentStep - 1) / steps.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-6">
      <h3 className="text-4xl font-bold mb-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Checkout Process
      </h3>

      {/* Stepper */}
      {currentStep < 5 && (
        <div className="w-full max-w-3xl mb-12 space-y-4">
          <div className="flex items-center justify-between w-full relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index + 1 < currentStep;
              const isActive = index + 1 === currentStep;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center relative w-full"
                >
                  {/* Step Circle */}
                  <div
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl border-2 text-sm font-semibold transition-all duration-300 ${
                      isCompleted
                        ? "bg-gradient-to-br from-green-400 to-emerald-500 border-transparent text-white shadow-lg shadow-green-200"
                        : isActive
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 border-transparent text-white shadow-xl shadow-indigo-300 scale-110"
                        : "bg-white border-gray-300 text-gray-400 shadow-md"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>

                  {/* Step Label */}
                  <span
                    className={`mt-3 text-sm font-semibold ${
                      isActive
                        ? "text-indigo-600"
                        : isCompleted
                        ? "text-emerald-600"
                        : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </span>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-7 left-[65%] w-full h-[2px] ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-400 to-emerald-500"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700 shadow-lg"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Step Contents */}
      {currentStep === 1 && (
        <Card className="flex flex-col items-center p-6 md:p-10 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl shadow-2xl w-full max-w-6xl">
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {products.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  className="group relative p-6 bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={`flex items-center justify-center ${item.color} rounded-2xl h-28 w-28 mx-auto mb-5 transition-transform duration-300 group-hover:scale-110 shadow-sm`}
                  >
                    <Icon className="h-14 w-14 text-indigo-600" />
                  </div>

                  {/* Name & Price */}
                  <div className="text-center mb-4">
                    <h4 className="text-base font-bold text-gray-800 mb-1">
                      {item.name}
                    </h4>
                    <p className="text-lg font-semibold text-indigo-600">
                      ₹{item.price}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <Button
                      variant="primary"
                      className="h-10 w-10 flex items-center justify-center bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 transition-all"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <Minus className="h-8 w-12 text-gray-700" />
                    </Button>
                    <span className="w-10 text-center font-bold text-lg text-gray-800">
                      {item.quantity}
                    </span>
                    <Button
                      variant="primary"
                      className="h-10 w-10 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500 border-0 rounded-xl hover:from-indigo-600 hover:to-purple-600 shadow-lg shadow-indigo-200 transition-all"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <Plus className="h-8 w-12 text-white" />
                    </Button>
                  </div>

                  <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-indigo-200 transition-all pointer-events-none" />
                </Card>
              );
            })}
          </div>

          {/* Cart Total */}
          <div className="w-full max-w-md mt-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 border-0 rounded-3xl shadow-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Cart Total</h3>
            <div className="flex items-center justify-center">
              <span className="text-5xl font-black text-white">
                ₹
                {products.reduce(
                  (acc, curr) => acc + curr.quantity * curr.price,
                  0
                )}
              </span>
            </div>
            <p className="text-sm text-indigo-100 mt-3 mb-6">
              (Including all selected items)
            </p>
            <Button
              variant="primary"
              className="mt-2 w-full py-3 font-bold rounded-2xl shadow-xl transition-all hover:scale-105"
              onClick={() => setCurrentStep(2)}
            >
              Proceed to Shipping →
            </Button>
          </div>
        </Card>
      )}

      <form>
        {currentStep === 2 && (
          <Card className="border border-gray-100 shadow-2xl rounded-3xl p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Shipping Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                {...form.register("fullName")}
                label="Full Name"
                placeholder="Enter your full name"
                message={form.formState.errors.fullName?.message}
              />
              <Input
                {...form.register("phoneNumber")}
                label="Phone Number"
                placeholder="Enter phone number"
                message={form.formState.errors.phoneNumber?.message}
              />
              <Input
                {...form.register("email")}
                label="Email"
                placeholder="Enter email address"
                message={form.formState.errors.email?.message}
              />
              <Input
                {...form.register("address")}
                label="Address"
                placeholder="Enter full address"
                className="col-span-1 md:col-span-2"
                message={form.formState.errors.address?.message}
              />
              <Input
                {...form.register("city")}
                label="City"
                placeholder="Enter city"
                message={form.formState.errors.city?.message}
              />
              <Input
                {...form.register("postalCode")}
                label="Postal Code"
                placeholder="Enter postal code"
                message={form.formState.errors.postalCode?.message}
              />
              <Input
                {...form.register("state")}
                label="State"
                placeholder="Enter state"
                message={form.formState.errors.state?.message}
              />
            </div>
          </Card>
        )}

        {currentStep === 3 && (
          <Card className="border border-gray-100 shadow-2xl rounded-3xl p-8 bg-white/80 backdrop-blur-sm min-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Payment Details
            </h2>
            <div className="grid grid-cols-1 gap-5">
              <select
                {...form.register("paymentMethod")}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-2xl text-gray-800 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all hover:border-gray-300 shadow-sm"
              >
                <option value="">Select</option>
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
              <span className="text-red-500 text-xs -mt-3">
                {form.formState.errors.paymentMethod?.message}
              </span>

              {form.watch("paymentMethod") === "card" && (
                <>
                  <Input
                    {...form.register("cardNumber")}
                    label="Card Number"
                    placeholder="XXXX XXXX XXXX XXXX"
                    message={form.formState.errors.cardNumber?.message}
                  />
                  <Input
                    {...form.register("expiryDate")}
                    label="Expiry Date"
                    placeholder="MM/YY"
                    message={form.formState.errors.expiryDate?.message}
                  />
                  <Input
                    {...form.register("cvv")}
                    label="CVV"
                    placeholder="123"
                    message={form.formState.errors.cvv?.message}
                  />
                  <Input
                    {...form.register("nameOnCard")}
                    label="Name on Card"
                    placeholder="Full Name"
                    message={form.formState.errors.nameOnCard?.message}
                  />
                </>
              )}

              {form.watch("paymentMethod") === "upi" && (
                <Input
                  {...form.register("upiId")}
                  label="UPI ID"
                  placeholder="example@upi"
                  message={form.formState.errors.upiId?.message}
                />
              )}
            </div>
          </Card>
        )}

        {currentStep === 4 && (
          <div className="max-w-4xl w-full space-y-6">
            {/* Order Review */}
            <Card className="p-8 rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Order Summary
              </h2>
              <div className="divide-y divide-gray-200">
                {products.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between py-4 text-gray-700 hover:bg-gray-50 px-4 rounded-xl transition-colors"
                  >
                    <span className="font-medium">
                      {item.name} x {item.quantity}
                    </span>
                    <span className="font-bold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between py-5 px-4 font-black text-gray-900 text-xl bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl mt-4">
                  <span>Total</span>
                  <span className="text-indigo-600">
                    ₹
                    {products.reduce(
                      (acc, curr) => acc + curr.price * curr.quantity,
                      0
                    )}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex items-center justify-end gap-4 mt-8 w-full max-w-3xl">
            {currentStep > 1 && (
              <Button
                variant="outline"
                type="button"
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="px-6 py-2.5 rounded-xl font-semibold border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                Back
              </Button>
            )}
            {currentStep === 4 ? (
              <Button
                variant="primary"
                type="button"
                onClick={handlePlaceOrder}
                className="px-8 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 transition-all hover:scale-105"
              >
                Place Order
              </Button>
            ) : currentStep > 1 ? (
              <Button
                variant="primary"
                type="button"
                onClick={handleNextStep}
                className="px-8 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 transition-all hover:scale-105"
              >
                Next
              </Button>
            ) : null}
          </div>
        )}
      </form>

      {/* Success Page */}
      {currentStep === 5 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-transparent p-6">
          <div className="bg-gradient-to-br from-green-400 to-emerald-500 text-white w-28 h-28 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-green-300">
            <Check className="h-14 w-14" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 mb-8 text-center text-lg">
            Thank you for your purchase. Your order has been confirmed and is
            being processed.
          </p>
          <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-gray-100 p-8 mb-8 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-5">
              Order Details
            </h3>
            <div className="space-y-3 text-gray-700 text-sm">
              <p className="flex justify-between py-2 px-3 bg-gray-50 rounded-xl">
                <span className="font-semibold">Order ID:</span>
                <span className="font-bold">#123456</span>
              </p>
              <p className="flex justify-between py-2 px-3 bg-gray-50 rounded-xl">
                <span className="font-semibold">Total Amount:</span>
                <span className="font-bold text-indigo-600">
                  ₹
                  {products.reduce(
                    (acc, curr) => acc + curr.price * curr.quantity,
                    0
                  )}
                </span>
              </p>
              <p className="flex justify-between py-2 px-3 bg-gray-50 rounded-xl">
                <span className="font-semibold">Payment Method:</span>
                <span className="font-bold capitalize">
                  {form.getValues("paymentMethod") === "card" ? "Card" : "UPI"}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant="primary"
              onClick={() => setCurrentStep(1)}
              className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 transition-all"
            >
              Go to Home
            </Button>
            <Button
              variant="outline"
              onClick={() => alert("Redirect to Orders Page")}
              className="px-6 py-2.5 rounded-xl font-semibold border-2 border-gray-300 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
            >
              View Orders
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stepper;
