def calculate_price(hours, price_per_hour, price_per_day):
    if hours <= 24:
        return hours * price_per_hour
    else:
        days = hours // 24
        return days * price_per_day
