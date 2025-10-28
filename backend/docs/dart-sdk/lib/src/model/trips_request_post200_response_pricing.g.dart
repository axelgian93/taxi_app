// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post200_response_pricing.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestPost200ResponsePricing
    extends TripsRequestPost200ResponsePricing {
  @override
  final num? baseFareUsd;
  @override
  final num? perKmUsd;
  @override
  final num? perMinUsd;
  @override
  final num? minFareUsd;
  @override
  final num? surgeMultiplier;
  @override
  final num? totalUsd;
  @override
  final TripsRequestPost200ResponsePricingBreakdown? breakdown;

  factory _$TripsRequestPost200ResponsePricing(
          [void Function(TripsRequestPost200ResponsePricingBuilder)?
              updates]) =>
      (TripsRequestPost200ResponsePricingBuilder()..update(updates))._build();

  _$TripsRequestPost200ResponsePricing._(
      {this.baseFareUsd,
      this.perKmUsd,
      this.perMinUsd,
      this.minFareUsd,
      this.surgeMultiplier,
      this.totalUsd,
      this.breakdown})
      : super._();
  @override
  TripsRequestPost200ResponsePricing rebuild(
          void Function(TripsRequestPost200ResponsePricingBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPost200ResponsePricingBuilder toBuilder() =>
      TripsRequestPost200ResponsePricingBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPost200ResponsePricing &&
        baseFareUsd == other.baseFareUsd &&
        perKmUsd == other.perKmUsd &&
        perMinUsd == other.perMinUsd &&
        minFareUsd == other.minFareUsd &&
        surgeMultiplier == other.surgeMultiplier &&
        totalUsd == other.totalUsd &&
        breakdown == other.breakdown;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, baseFareUsd.hashCode);
    _$hash = $jc(_$hash, perKmUsd.hashCode);
    _$hash = $jc(_$hash, perMinUsd.hashCode);
    _$hash = $jc(_$hash, minFareUsd.hashCode);
    _$hash = $jc(_$hash, surgeMultiplier.hashCode);
    _$hash = $jc(_$hash, totalUsd.hashCode);
    _$hash = $jc(_$hash, breakdown.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestPost200ResponsePricing')
          ..add('baseFareUsd', baseFareUsd)
          ..add('perKmUsd', perKmUsd)
          ..add('perMinUsd', perMinUsd)
          ..add('minFareUsd', minFareUsd)
          ..add('surgeMultiplier', surgeMultiplier)
          ..add('totalUsd', totalUsd)
          ..add('breakdown', breakdown))
        .toString();
  }
}

class TripsRequestPost200ResponsePricingBuilder
    implements
        Builder<TripsRequestPost200ResponsePricing,
            TripsRequestPost200ResponsePricingBuilder> {
  _$TripsRequestPost200ResponsePricing? _$v;

  num? _baseFareUsd;
  num? get baseFareUsd => _$this._baseFareUsd;
  set baseFareUsd(num? baseFareUsd) => _$this._baseFareUsd = baseFareUsd;

  num? _perKmUsd;
  num? get perKmUsd => _$this._perKmUsd;
  set perKmUsd(num? perKmUsd) => _$this._perKmUsd = perKmUsd;

  num? _perMinUsd;
  num? get perMinUsd => _$this._perMinUsd;
  set perMinUsd(num? perMinUsd) => _$this._perMinUsd = perMinUsd;

  num? _minFareUsd;
  num? get minFareUsd => _$this._minFareUsd;
  set minFareUsd(num? minFareUsd) => _$this._minFareUsd = minFareUsd;

  num? _surgeMultiplier;
  num? get surgeMultiplier => _$this._surgeMultiplier;
  set surgeMultiplier(num? surgeMultiplier) =>
      _$this._surgeMultiplier = surgeMultiplier;

  num? _totalUsd;
  num? get totalUsd => _$this._totalUsd;
  set totalUsd(num? totalUsd) => _$this._totalUsd = totalUsd;

  TripsRequestPost200ResponsePricingBreakdownBuilder? _breakdown;
  TripsRequestPost200ResponsePricingBreakdownBuilder get breakdown =>
      _$this._breakdown ??=
          TripsRequestPost200ResponsePricingBreakdownBuilder();
  set breakdown(
          TripsRequestPost200ResponsePricingBreakdownBuilder? breakdown) =>
      _$this._breakdown = breakdown;

  TripsRequestPost200ResponsePricingBuilder() {
    TripsRequestPost200ResponsePricing._defaults(this);
  }

  TripsRequestPost200ResponsePricingBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _baseFareUsd = $v.baseFareUsd;
      _perKmUsd = $v.perKmUsd;
      _perMinUsd = $v.perMinUsd;
      _minFareUsd = $v.minFareUsd;
      _surgeMultiplier = $v.surgeMultiplier;
      _totalUsd = $v.totalUsd;
      _breakdown = $v.breakdown?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPost200ResponsePricing other) {
    _$v = other as _$TripsRequestPost200ResponsePricing;
  }

  @override
  void update(
      void Function(TripsRequestPost200ResponsePricingBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPost200ResponsePricing build() => _build();

  _$TripsRequestPost200ResponsePricing _build() {
    _$TripsRequestPost200ResponsePricing _$result;
    try {
      _$result = _$v ??
          _$TripsRequestPost200ResponsePricing._(
            baseFareUsd: baseFareUsd,
            perKmUsd: perKmUsd,
            perMinUsd: perMinUsd,
            minFareUsd: minFareUsd,
            surgeMultiplier: surgeMultiplier,
            totalUsd: totalUsd,
            breakdown: _breakdown?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'breakdown';
        _breakdown?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'TripsRequestPost200ResponsePricing', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
