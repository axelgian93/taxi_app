// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_id_complete_post200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsIdCompletePost200Response extends TripsIdCompletePost200Response {
  @override
  final bool? ok;
  @override
  final TripsRequestPost200ResponseTrip? trip;
  @override
  final TripsRequestPost200ResponsePricing? pricing;
  @override
  final String? clientSecret;

  factory _$TripsIdCompletePost200Response(
          [void Function(TripsIdCompletePost200ResponseBuilder)? updates]) =>
      (TripsIdCompletePost200ResponseBuilder()..update(updates))._build();

  _$TripsIdCompletePost200Response._(
      {this.ok, this.trip, this.pricing, this.clientSecret})
      : super._();
  @override
  TripsIdCompletePost200Response rebuild(
          void Function(TripsIdCompletePost200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsIdCompletePost200ResponseBuilder toBuilder() =>
      TripsIdCompletePost200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsIdCompletePost200Response &&
        ok == other.ok &&
        trip == other.trip &&
        pricing == other.pricing &&
        clientSecret == other.clientSecret;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, ok.hashCode);
    _$hash = $jc(_$hash, trip.hashCode);
    _$hash = $jc(_$hash, pricing.hashCode);
    _$hash = $jc(_$hash, clientSecret.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsIdCompletePost200Response')
          ..add('ok', ok)
          ..add('trip', trip)
          ..add('pricing', pricing)
          ..add('clientSecret', clientSecret))
        .toString();
  }
}

class TripsIdCompletePost200ResponseBuilder
    implements
        Builder<TripsIdCompletePost200Response,
            TripsIdCompletePost200ResponseBuilder> {
  _$TripsIdCompletePost200Response? _$v;

  bool? _ok;
  bool? get ok => _$this._ok;
  set ok(bool? ok) => _$this._ok = ok;

  TripsRequestPost200ResponseTripBuilder? _trip;
  TripsRequestPost200ResponseTripBuilder get trip =>
      _$this._trip ??= TripsRequestPost200ResponseTripBuilder();
  set trip(TripsRequestPost200ResponseTripBuilder? trip) => _$this._trip = trip;

  TripsRequestPost200ResponsePricingBuilder? _pricing;
  TripsRequestPost200ResponsePricingBuilder get pricing =>
      _$this._pricing ??= TripsRequestPost200ResponsePricingBuilder();
  set pricing(TripsRequestPost200ResponsePricingBuilder? pricing) =>
      _$this._pricing = pricing;

  String? _clientSecret;
  String? get clientSecret => _$this._clientSecret;
  set clientSecret(String? clientSecret) => _$this._clientSecret = clientSecret;

  TripsIdCompletePost200ResponseBuilder() {
    TripsIdCompletePost200Response._defaults(this);
  }

  TripsIdCompletePost200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _trip = $v.trip?.toBuilder();
      _pricing = $v.pricing?.toBuilder();
      _clientSecret = $v.clientSecret;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsIdCompletePost200Response other) {
    _$v = other as _$TripsIdCompletePost200Response;
  }

  @override
  void update(void Function(TripsIdCompletePost200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsIdCompletePost200Response build() => _build();

  _$TripsIdCompletePost200Response _build() {
    _$TripsIdCompletePost200Response _$result;
    try {
      _$result = _$v ??
          _$TripsIdCompletePost200Response._(
            ok: ok,
            trip: _trip?.build(),
            pricing: _pricing?.build(),
            clientSecret: clientSecret,
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'trip';
        _trip?.build();
        _$failedField = 'pricing';
        _pricing?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'TripsIdCompletePost200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
