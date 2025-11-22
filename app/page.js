<div
                key={plan.id}
                className="card flex flex-col justify-between bg-gradient-to-br from-lamoraGray to-black"
              >
                <div className="space-y-2">
                  <div className="text-lamoraGold font-bold text-lg">
                    {plan.nameAr}
                  </div>
                  <div className="text-xs text-gray-400">
                    {plan.nameEn}
                  </div>
                  <div className="text-sm text-gray-200 pt-2">
                    الحد الأدنى:{" "}
                    <span className="font-semibold">
                      ${plan.min}
                    </span>
                    <br />
                    الحد الأقصى:{" "}
                    <span className="font-semibold">
                      ${plan.max}
                    </span>
                  </div>
                </div>
                <div className="pt-4 flex items-center justify-between">
                  <div className="text-lamoraGold font-semibold text-sm">
                    العائد: {plan.profit}
                  </div>
                  <a
                    href="/auth/signup"
                    className="text-xs btn-gold"
                  >
                    استثمار الآن
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
