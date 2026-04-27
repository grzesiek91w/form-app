# 🚀 AppCore - Formularz rejestracyjny

Projekt to aplikacja typu SPA wykonana w Angularze 21. Służy do rejestracji klientów indywidualnych oraz firm za pomocą wieloetapowego formularza.

---

## 🌐 Opis projektu

Aplikacja składa się z kilku sekcji i funkcjonalności, które pozwalają na sprawne wprowadzanie danych i zarządzanie zgodami. Całość jest responsywna i dostosowana do urządzeń mobilnych.

Główne elementy strony:
- 🔝 **Navbar** – menu nawigacyjne z logo i przełącznikiem trybu ciemnego.
- 📑 **Stepper** – formularz podzielony na kroki (Dane klienta oraz Zgody).
- 🌓 **Tryb ciemny** – obsługa kolorystyki Dark Mode oparta o zmienne CSS.
- ♿ **Standard WCAG 2.2** – obsługa czytników ekranu oraz nawigacji klawiaturą.
- 📱 **Menu mobilne** – panel boczny (Drawer) dla użytkowników telefonów.
- 👥 **O nas** – podstrona informacyjna.
- 📞 **Stopka** – sekcja z prawami autorskimi i linkami społecznościowymi.

---

## 🎨 UI / UX

### 🔹 Design
Wygląd opiera się na stonowanej palecie barw (odcienie Slate i Indigo). Do stylowania wykorzystano **Tailwind CSS 4** oraz komponenty **PrimeNG**.

Co zostało wdrożone:
- **System zmiennych CSS**: Kolory są trzymane w osobnym pliku, co ułatwia ich zmianę w całej aplikacji.
- **Reaktywne przyciski**: Kolorystyka przycisków zmienia się automatycznie, gdy formularz zostanie poprawnie wypełniony.
- **Stylowanie PrimeNG**: Komponenty biblioteki zostały zmodyfikowane tak, aby pasowały do reszty projektu.

### 🔹 Wykorzystane komponenty
Użyto następujących elementów PrimeNG:
- `p-stepper` (nawigacja krokowa)
- `p-select` (wybór typu klienta)
- `p-checkbox` (pola wyboru w sekcji zgód)
- `p-drawer` (menu boczne)

---

## 🛠️ Technologie


| Technologia | Zastosowanie |
|------------|--------------|
| **Angular 21** | Główna architektura w trybie **Zoneless**. |
| **Signals** | Zarządzanie stanem i odświeżanie widoku. |
| **TypeScript** | Silne typowanie i modele danych. |
| **Reactive Forms** | Obsługa logiki formularzy i walidacji. |
| **Tailwind 4** | Układ strony i responsywność. |

---

## ⚙️ Logika i rozwiązania techniczne

- **Walidacja zależna od typu**: Formularz dynamicznie zmienia wymagane pola w zależności od wyboru między osobą prywatną a firmą.
- **Unie dyskryminatywne**: Modele danych w TypeScript są zaprojektowane tak, aby pola specyficzne dla firmy nie występowały w danych osoby i odwrotnie.
- **Dostępność cyfrowa**: Użycie atrybutów `aria-describedby` i `aria-invalid` pozwala na poprawną obsługę błędów przez czytniki ekranu.
- **Licznik zgód**: Reaktywny mechanizm informujący o liczbie brakujących zgód wymaganych do zapisania formularza.

---

## 📦 Instalacja i uruchomienie

```bash
# Instalacja potrzebnych paczek
npm install

# Uruchomienie aplikacji lokalnie
ng serve -o
```
