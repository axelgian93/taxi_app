// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request_post_request_one_of1_origin.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequestPostRequestOneOf1Origin
    extends TripsRequestPostRequestOneOf1Origin {
  @override
  final num lat;
  @override
  final num lng;

  factory _$TripsRequestPostRequestOneOf1Origin(
          [void Function(TripsRequestPostRequestOneOf1OriginBuilder)?
              updates]) =>
      (TripsRequestPostRequestOneOf1OriginBuilder()..update(updates))._build();

  _$TripsRequestPostRequestOneOf1Origin._(
      {required this.lat, required this.lng})
      : super._();
  @override
  TripsRequestPostRequestOneOf1Origin rebuild(
          void Function(TripsRequestPostRequestOneOf1OriginBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequestPostRequestOneOf1OriginBuilder toBuilder() =>
      TripsRequestPostRequestOneOf1OriginBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequestPostRequestOneOf1Origin &&
        lat == other.lat &&
        lng == other.lng;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, lat.hashCode);
    _$hash = $jc(_$hash, lng.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequestPostRequestOneOf1Origin')
          ..add('lat', lat)
          ..add('lng', lng))
        .toString();
  }
}

class TripsRequestPostRequestOneOf1OriginBuilder
    implements
        Builder<TripsRequestPostRequestOneOf1Origin,
            TripsRequestPostRequestOneOf1OriginBuilder> {
  _$TripsRequestPostRequestOneOf1Origin? _$v;

  num? _lat;
  num? get lat => _$this._lat;
  set lat(num? lat) => _$this._lat = lat;

  num? _lng;
  num? get lng => _$this._lng;
  set lng(num? lng) => _$this._lng = lng;

  TripsRequestPostRequestOneOf1OriginBuilder() {
    TripsRequestPostRequestOneOf1Origin._defaults(this);
  }

  TripsRequestPostRequestOneOf1OriginBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _lat = $v.lat;
      _lng = $v.lng;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequestPostRequestOneOf1Origin other) {
    _$v = other as _$TripsRequestPostRequestOneOf1Origin;
  }

  @override
  void update(
      void Function(TripsRequestPostRequestOneOf1OriginBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequestPostRequestOneOf1Origin build() => _build();

  _$TripsRequestPostRequestOneOf1Origin _build() {
    final _$result = _$v ??
        _$TripsRequestPostRequestOneOf1Origin._(
          lat: BuiltValueNullFieldError.checkNotNull(
              lat, r'TripsRequestPostRequestOneOf1Origin', 'lat'),
          lng: BuiltValueNullFieldError.checkNotNull(
              lng, r'TripsRequestPostRequestOneOf1Origin', 'lng'),
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
