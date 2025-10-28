// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestPost200Response extends TripsRequestPost200Response {
  @override
  final bool? ok;
  @override
  final TripsRequestPost200ResponseTrip? trip;
  @override
  final TripsRequestPost200ResponsePricing? pricing;

  factory _$TripsRequestPost200Response(
          [void Function(TripsRequestPost200ResponseBuilder)? updates]) =>
      (TripsRequestPost200ResponseBuilder()..update(updates))._build();

  _$TripsRequestPost200Response._({this.ok, this.trip, this.pricing})
      : super._();
  @override
  TripsRequestPost200Response rebuild(
          void Function(TripsRequestPost200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPost200ResponseBuilder toBuilder() =>
      TripsRequestPost200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPost200Response &&
        ok == other.ok &&
        trip == other.trip &&
        pricing == other.pricing;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, ok.hashCode);
    _$hash = $jc(_$hash, trip.hashCode);
    _$hash = $jc(_$hash, pricing.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestPost200Response')
          ..add('ok', ok)
          ..add('trip', trip)
          ..add('pricing', pricing))
        .toString();
  }
}

class TripsRequestPost200ResponseBuilder
    implements
        Builder<TripsRequestPost200Response,
            TripsRequestPost200ResponseBuilder> {
  _$TripsRequestPost200Response? _$v;

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

  TripsRequestPost200ResponseBuilder() {
    TripsRequestPost200Response._defaults(this);
  }

  TripsRequestPost200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _trip = $v.trip?.toBuilder();
      _pricing = $v.pricing?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPost200Response other) {
    _$v = other as _$TripsRequestPost200Response;
  }

  @override
  void update(void Function(TripsRequestPost200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPost200Response build() => _build();

  _$TripsRequestPost200Response _build() {
    _$TripsRequestPost200Response _$result;
    try {
      _$result = _$v ??
          _$TripsRequestPost200Response._(
            ok: ok,
            trip: _trip?.build(),
            pricing: _pricing?.build(),
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
            r'TripsRequestPost200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
