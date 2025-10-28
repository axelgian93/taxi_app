// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'admin_tariffs_list200_response_items_inner.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$AdminTariffsList200ResponseItemsInner
    extends AdminTariffsList200ResponseItemsInner {
  @override
  final String? id;
  @override
  final String? city;
  @override
  final bool? active;
  @override
  final num? baseFareUsd;
  @override
  final num? perKmUsd;
  @override
  final num? perMinUsd;
  @override
  final num? minFareUsd;
  @override
  final num? nightMultiplier;
  @override
  final num? weekendMultiplier;
  @override
  final num? surgeMultiplier;
  @override
  final int? nightStartHour;
  @override
  final int? nightEndHour;
  @override
  final int? cancellationGraceSec;
  @override
  final num? cancellationFeeAcceptedUsd;
  @override
  final num? cancellationFeeArrivedUsd;
  @override
  final DateTime? validFrom;
  @override
  final DateTime? validTo;
  @override
  final String? notes;
  @override
  final DateTime? createdAt;
  @override
  final DateTime? updatedAt;

  factory _$AdminTariffsList200ResponseItemsInner(
          [void Function(AdminTariffsList200ResponseItemsInnerBuilder)?
              updates]) =>
      (AdminTariffsList200ResponseItemsInnerBuilder()..update(updates))
          ._build();

  _$AdminTariffsList200ResponseItemsInner._(
      {this.id,
      this.city,
      this.active,
      this.baseFareUsd,
      this.perKmUsd,
      this.perMinUsd,
      this.minFareUsd,
      this.nightMultiplier,
      this.weekendMultiplier,
      this.surgeMultiplier,
      this.nightStartHour,
      this.nightEndHour,
      this.cancellationGraceSec,
      this.cancellationFeeAcceptedUsd,
      this.cancellationFeeArrivedUsd,
      this.validFrom,
      this.validTo,
      this.notes,
      this.createdAt,
      this.updatedAt})
      : super._();
  @override
  AdminTariffsList200ResponseItemsInner rebuild(
          void Function(AdminTariffsList200ResponseItemsInnerBuilder)
              updates) =>
      (toBuilder()..update(updates)).build();

  @override
  AdminTariffsList200ResponseItemsInnerBuilder toBuilder() =>
      AdminTariffsList200ResponseItemsInnerBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is AdminTariffsList200ResponseItemsInner &&
        id == other.id &&
        city == other.city &&
        active == other.active &&
        baseFareUsd == other.baseFareUsd &&
        perKmUsd == other.perKmUsd &&
        perMinUsd == other.perMinUsd &&
        minFareUsd == other.minFareUsd &&
        nightMultiplier == other.nightMultiplier &&
        weekendMultiplier == other.weekendMultiplier &&
        surgeMultiplier == other.surgeMultiplier &&
        nightStartHour == other.nightStartHour &&
        nightEndHour == other.nightEndHour &&
        cancellationGraceSec == other.cancellationGraceSec &&
        cancellationFeeAcceptedUsd == other.cancellationFeeAcceptedUsd &&
        cancellationFeeArrivedUsd == other.cancellationFeeArrivedUsd &&
        validFrom == other.validFrom &&
        validTo == other.validTo &&
        notes == other.notes &&
        createdAt == other.createdAt &&
        updatedAt == other.updatedAt;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, id.hashCode);
    _$hash = $jc(_$hash, city.hashCode);
    _$hash = $jc(_$hash, active.hashCode);
    _$hash = $jc(_$hash, baseFareUsd.hashCode);
    _$hash = $jc(_$hash, perKmUsd.hashCode);
    _$hash = $jc(_$hash, perMinUsd.hashCode);
    _$hash = $jc(_$hash, minFareUsd.hashCode);
    _$hash = $jc(_$hash, nightMultiplier.hashCode);
    _$hash = $jc(_$hash, weekendMultiplier.hashCode);
    _$hash = $jc(_$hash, surgeMultiplier.hashCode);
    _$hash = $jc(_$hash, nightStartHour.hashCode);
    _$hash = $jc(_$hash, nightEndHour.hashCode);
    _$hash = $jc(_$hash, cancellationGraceSec.hashCode);
    _$hash = $jc(_$hash, cancellationFeeAcceptedUsd.hashCode);
    _$hash = $jc(_$hash, cancellationFeeArrivedUsd.hashCode);
    _$hash = $jc(_$hash, validFrom.hashCode);
    _$hash = $jc(_$hash, validTo.hashCode);
    _$hash = $jc(_$hash, notes.hashCode);
    _$hash = $jc(_$hash, createdAt.hashCode);
    _$hash = $jc(_$hash, updatedAt.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(
            r'AdminTariffsList200ResponseItemsInner')
          ..add('id', id)
          ..add('city', city)
          ..add('active', active)
          ..add('baseFareUsd', baseFareUsd)
          ..add('perKmUsd', perKmUsd)
          ..add('perMinUsd', perMinUsd)
          ..add('minFareUsd', minFareUsd)
          ..add('nightMultiplier', nightMultiplier)
          ..add('weekendMultiplier', weekendMultiplier)
          ..add('surgeMultiplier', surgeMultiplier)
          ..add('nightStartHour', nightStartHour)
          ..add('nightEndHour', nightEndHour)
          ..add('cancellationGraceSec', cancellationGraceSec)
          ..add('cancellationFeeAcceptedUsd', cancellationFeeAcceptedUsd)
          ..add('cancellationFeeArrivedUsd', cancellationFeeArrivedUsd)
          ..add('validFrom', validFrom)
          ..add('validTo', validTo)
          ..add('notes', notes)
          ..add('createdAt', createdAt)
          ..add('updatedAt', updatedAt))
        .toString();
  }
}

class AdminTariffsList200ResponseItemsInnerBuilder
    implements
        Builder<AdminTariffsList200ResponseItemsInner,
            AdminTariffsList200ResponseItemsInnerBuilder> {
  _$AdminTariffsList200ResponseItemsInner? _$v;

  String? _id;
  String? get id => _$this._id;
  set id(String? id) => _$this._id = id;

  String? _city;
  String? get city => _$this._city;
  set city(String? city) => _$this._city = city;

  bool? _active;
  bool? get active => _$this._active;
  set active(bool? active) => _$this._active = active;

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

  num? _nightMultiplier;
  num? get nightMultiplier => _$this._nightMultiplier;
  set nightMultiplier(num? nightMultiplier) =>
      _$this._nightMultiplier = nightMultiplier;

  num? _weekendMultiplier;
  num? get weekendMultiplier => _$this._weekendMultiplier;
  set weekendMultiplier(num? weekendMultiplier) =>
      _$this._weekendMultiplier = weekendMultiplier;

  num? _surgeMultiplier;
  num? get surgeMultiplier => _$this._surgeMultiplier;
  set surgeMultiplier(num? surgeMultiplier) =>
      _$this._surgeMultiplier = surgeMultiplier;

  int? _nightStartHour;
  int? get nightStartHour => _$this._nightStartHour;
  set nightStartHour(int? nightStartHour) =>
      _$this._nightStartHour = nightStartHour;

  int? _nightEndHour;
  int? get nightEndHour => _$this._nightEndHour;
  set nightEndHour(int? nightEndHour) => _$this._nightEndHour = nightEndHour;

  int? _cancellationGraceSec;
  int? get cancellationGraceSec => _$this._cancellationGraceSec;
  set cancellationGraceSec(int? cancellationGraceSec) =>
      _$this._cancellationGraceSec = cancellationGraceSec;

  num? _cancellationFeeAcceptedUsd;
  num? get cancellationFeeAcceptedUsd => _$this._cancellationFeeAcceptedUsd;
  set cancellationFeeAcceptedUsd(num? cancellationFeeAcceptedUsd) =>
      _$this._cancellationFeeAcceptedUsd = cancellationFeeAcceptedUsd;

  num? _cancellationFeeArrivedUsd;
  num? get cancellationFeeArrivedUsd => _$this._cancellationFeeArrivedUsd;
  set cancellationFeeArrivedUsd(num? cancellationFeeArrivedUsd) =>
      _$this._cancellationFeeArrivedUsd = cancellationFeeArrivedUsd;

  DateTime? _validFrom;
  DateTime? get validFrom => _$this._validFrom;
  set validFrom(DateTime? validFrom) => _$this._validFrom = validFrom;

  DateTime? _validTo;
  DateTime? get validTo => _$this._validTo;
  set validTo(DateTime? validTo) => _$this._validTo = validTo;

  String? _notes;
  String? get notes => _$this._notes;
  set notes(String? notes) => _$this._notes = notes;

  DateTime? _createdAt;
  DateTime? get createdAt => _$this._createdAt;
  set createdAt(DateTime? createdAt) => _$this._createdAt = createdAt;

  DateTime? _updatedAt;
  DateTime? get updatedAt => _$this._updatedAt;
  set updatedAt(DateTime? updatedAt) => _$this._updatedAt = updatedAt;

  AdminTariffsList200ResponseItemsInnerBuilder() {
    AdminTariffsList200ResponseItemsInner._defaults(this);
  }

  AdminTariffsList200ResponseItemsInnerBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _id = $v.id;
      _city = $v.city;
      _active = $v.active;
      _baseFareUsd = $v.baseFareUsd;
      _perKmUsd = $v.perKmUsd;
      _perMinUsd = $v.perMinUsd;
      _minFareUsd = $v.minFareUsd;
      _nightMultiplier = $v.nightMultiplier;
      _weekendMultiplier = $v.weekendMultiplier;
      _surgeMultiplier = $v.surgeMultiplier;
      _nightStartHour = $v.nightStartHour;
      _nightEndHour = $v.nightEndHour;
      _cancellationGraceSec = $v.cancellationGraceSec;
      _cancellationFeeAcceptedUsd = $v.cancellationFeeAcceptedUsd;
      _cancellationFeeArrivedUsd = $v.cancellationFeeArrivedUsd;
      _validFrom = $v.validFrom;
      _validTo = $v.validTo;
      _notes = $v.notes;
      _createdAt = $v.createdAt;
      _updatedAt = $v.updatedAt;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(AdminTariffsList200ResponseItemsInner other) {
    _$v = other as _$AdminTariffsList200ResponseItemsInner;
  }

  @override
  void update(
      void Function(AdminTariffsList200ResponseItemsInnerBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  AdminTariffsList200ResponseItemsInner build() => _build();

  _$AdminTariffsList200ResponseItemsInner _build() {
    final _$result = _$v ??
        _$AdminTariffsList200ResponseItemsInner._(
          id: id,
          city: city,
          active: active,
          baseFareUsd: baseFareUsd,
          perKmUsd: perKmUsd,
          perMinUsd: perMinUsd,
          minFareUsd: minFareUsd,
          nightMultiplier: nightMultiplier,
          weekendMultiplier: weekendMultiplier,
          surgeMultiplier: surgeMultiplier,
          nightStartHour: nightStartHour,
          nightEndHour: nightEndHour,
          cancellationGraceSec: cancellationGraceSec,
          cancellationFeeAcceptedUsd: cancellationFeeAcceptedUsd,
          cancellationFeeArrivedUsd: cancellationFeeArrivedUsd,
          validFrom: validFrom,
          validTo: validTo,
          notes: notes,
          createdAt: createdAt,
          updatedAt: updatedAt,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
