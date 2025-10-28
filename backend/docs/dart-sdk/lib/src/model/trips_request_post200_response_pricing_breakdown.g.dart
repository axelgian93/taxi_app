// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post200_response_pricing_breakdown.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestPost200ResponsePricingBreakdown
    extends TripsRequestPost200ResponsePricingBreakdown {
  @override
  final num? base_;
  @override
  final num? distance;
  @override
  final num? duration;
  @override
  final num? surge;

  factory _$TripsRequestPost200ResponsePricingBreakdown(
          [void Function(TripsRequestPost200ResponsePricingBreakdownBuilder)?
              updates]) =>
      (TripsRequestPost200ResponsePricingBreakdownBuilder()..update(updates))
          ._build();

  _$TripsRequestPost200ResponsePricingBreakdown._(
      {this.base_, this.distance, this.duration, this.surge})
      : super._();
  @override
  TripsRequestPost200ResponsePricingBreakdown rebuild(
          void Function(TripsRequestPost200ResponsePricingBreakdownBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPost200ResponsePricingBreakdownBuilder toBuilder() =>
      TripsRequestPost200ResponsePricingBreakdownBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPost200ResponsePricingBreakdown &&
        base_ == other.base_ &&
        distance == other.distance &&
        duration == other.duration &&
        surge == other.surge;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, base_.hashCode);
    _$hash = $jc(_$hash, distance.hashCode);
    _$hash = $jc(_$hash, duration.hashCode);
    _$hash = $jc(_$hash, surge.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            r'TripsRequestPost200ResponsePricingBreakdown')
          ..add('base_', base_)
          ..add('distance', distance)
          ..add('duration', duration)
          ..add('surge', surge))
        .toString();
  }
}

class TripsRequestPost200ResponsePricingBreakdownBuilder
    implements
        Builder<TripsRequestPost200ResponsePricingBreakdown,
            TripsRequestPost200ResponsePricingBreakdownBuilder> {
  _$TripsRequestPost200ResponsePricingBreakdown? _$v;

  num? _base_;
  num? get base_ => _$this._base_;
  set base_(num? base_) => _$this._base_ = base_;

  num? _distance;
  num? get distance => _$this._distance;
  set distance(num? distance) => _$this._distance = distance;

  num? _duration;
  num? get duration => _$this._duration;
  set duration(num? duration) => _$this._duration = duration;

  num? _surge;
  num? get surge => _$this._surge;
  set surge(num? surge) => _$this._surge = surge;

  TripsRequestPost200ResponsePricingBreakdownBuilder() {
    TripsRequestPost200ResponsePricingBreakdown._defaults(this);
  }

  TripsRequestPost200ResponsePricingBreakdownBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _base_ = $v.base_;
      _distance = $v.distance;
      _duration = $v.duration;
      _surge = $v.surge;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPost200ResponsePricingBreakdown other) {
    _$v = other as _$TripsRequestPost200ResponsePricingBreakdown;
  }

  @override
  void update(
      void Function(TripsRequestPost200ResponsePricingBreakdownBuilder)?
          updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPost200ResponsePricingBreakdown build() => _build();

  _$TripsRequestPost200ResponsePricingBreakdown _build() {
    final _$result = _$v ??
        _$TripsRequestPost200ResponsePricingBreakdown._(
          base_: base_,
          distance: distance,
          duration: duration,
          surge: surge,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
